use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::cmp::Ordering;
use std::collections::{BTreeMap, VecDeque};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, Eq, PartialEq, Copy)]
pub struct Position {
    index: usize,
    site_id: Uuid,
    counter: u64,
}

impl Ord for Position {
    fn cmp(&self, other: &Self) -> Ordering {
        self.index
            .cmp(&other.index)
            .then(self.site_id.cmp(&other.site_id))
            .then(self.counter.cmp(&other.counter))
    }
}

impl PartialOrd for Position {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Operation {
    Insert {
        position: Position,
        content: char,
        timestamp: DateTime<Utc>,
    },
    Delete {
        position: Position,
        timestamp: DateTime<Utc>,
    },
}

impl Operation {
    pub fn timestamp(&self) -> DateTime<Utc> {
        match self {
            Operation::Insert { timestamp, .. } => *timestamp,
            Operation::Delete { timestamp, .. } => *timestamp,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Batch {
    operations: Vec<Operation>,
    timestamp: DateTime<Utc>,
}

#[derive(Debug)]
pub struct DeltaRope {
    content: BTreeMap<Position, Option<char>>,
    history: VecDeque<Operation>,
    counter: u64,
    site_id: Uuid,
    deleted_count: usize,
    index_cache: BTreeMap<usize, Position>,
    pending_batch: Option<Vec<Operation>>,
    history_limit: usize,
}

impl DeltaRope {
    pub fn new(site_id: Uuid) -> Self {
        Self {
            content: BTreeMap::new(),
            history: VecDeque::new(),
            counter: 0,
            site_id,
            deleted_count: 0,
            index_cache: BTreeMap::new(),
            pending_batch: None,
            history_limit: 1000,
        }
    }

    fn is_valid_position(&self, position: &Position) -> bool {
        position.index <= self.content.len()
    }

    pub fn apply_operation(&mut self, op: Operation) -> Result<(), OperationError> {
        let result = match &op {
            Operation::Insert {
                position, content, ..
            } => {
                if !self.is_valid_position(position) {
                    return Err(OperationError::InvalidPosition);
                }
                self.content.insert(position.clone(), Some(*content));
                Ok(())
            }
            Operation::Delete { position, .. } => {
                if let Some(Some(_)) = self.content.get(position) {
                    self.content.insert(position.clone(), None);
                    self.deleted_count += 1;
                    Ok(())
                } else {
                    Err(OperationError::InvalidPosition)
                }
            }
        };

        if result.is_ok() {
            self.record_history(op);
        }
        result
    }

    pub fn replay_from(&mut self, timestamp: DateTime<Utc>) -> Result<(), ReplayError> {
        let ops: Vec<_> = self
            .history
            .iter()
            .filter(|op| op.timestamp() >= timestamp)
            .cloned()
            .collect();

        self.content.clear();
        self.deleted_count = 0;
        self.index_cache.clear();

        for op in ops {
            self.apply_operation(op)?;
        }
        Ok(())
    }

    fn record_history(&mut self, op: Operation) {
        self.history.push_back(op);
        while self.history.len() > self.history_limit {
            self.history.pop_front();
        }
    }

    pub fn commit_batch(&mut self) -> Option<Vec<Operation>> {
        self.pending_batch.take()
    }

    pub fn begin_batch(&mut self) {
        self.pending_batch = Some(Vec::new());
    }

    pub fn rollback_batch(&mut self) {
        self.pending_batch = None;
    }

    pub fn find_position_by_index(&self, target_index: usize) -> Option<Position> {
        if let Some(pos) = self.index_cache.get(&target_index) {
            return Some(*pos);
        }

        let mut current_index = 0;
        for (pos, content) in &self.content {
            if content.is_some() {
                if current_index == target_index {
                    return Some(*pos);
                }
                current_index += 1;
            }
        }
        None
    }

    pub fn to_string(&self) -> String {
        self.content.values().filter_map(|c| *c).collect()
    }

    pub fn stats(&self) -> RopeStats {
        RopeStats {
            total_chars: self.content.values().filter(|c| c.is_some()).count(),
            deleted_chars: self.deleted_count,
            total_operations: self.counter,
            cache_size: self.index_cache.len(),
        }
    }

    pub fn compress(&mut self) -> usize {
        let deleted_count = self.deleted_count;
        self.content.retain(|_, v| v.is_some());
        self.deleted_count = 0;
        self.index_cache.clear();
        deleted_count
    }

    pub fn insert(&mut self, index: usize, ch: char) -> Operation {
        self.counter += 1;
        let position = Position {
            index,
            site_id: self.site_id,
            counter: self.counter,
        };

        let op = Operation::Insert {
            position,
            content: ch,
            timestamp: Utc::now(),
        };

        if let Some(batch) = &mut self.pending_batch {
            batch.push(op.clone());
        } else {
            let _ = self.apply_operation(op.clone());
        }
        op
    }

    pub fn delete(&mut self, index: usize) -> Option<Operation> {
        let position = self.find_position_by_index(index)?;
        let op = Operation::Delete {
            position,
            timestamp: Utc::now(),
        };

        if let Some(batch) = &mut self.pending_batch {
            batch.push(op.clone());
            Some(op)
        } else {
            match self.apply_operation(op.clone()) {
                Ok(_) => Some(op),
                Err(_) => None,
            }
        }
    }

    pub fn insert_text(&mut self, index: usize, text: &str) -> Vec<Operation> {
        let mut ops = Vec::with_capacity(text.len());
        for (i, ch) in text.chars().enumerate() {
            ops.push(self.insert(index + i, ch));
        }
        ops
    }

    pub fn export_history(&self) -> Vec<Operation> {
        self.history.iter().cloned().collect()
    }

    pub fn import_history(&mut self, operations: Vec<Operation>) -> Result<(), ReplayError> {
        self.content.clear();
        self.history.clear();
        self.deleted_count = 0;
        self.index_cache.clear();

        for op in operations {
            self.apply_operation(op)?;
        }
        Ok(())
    }
}

#[derive(Debug)]
pub struct RopeStats {
    pub total_chars: usize,
    pub deleted_chars: usize,
    pub total_operations: u64,
    pub cache_size: usize,
}

#[derive(Debug, thiserror::Error)]
pub enum OperationError {
    #[error("Invalid position")]
    InvalidPosition,
    #[error("Operation failed: {0}")]
    Other(String),
}

#[derive(Debug, thiserror::Error)]
pub enum ReplayError {
    #[error("Operation failed during replay: {0}")]
    OperationFailed(OperationError),
    #[error("Invalid history state: {0}")]
    InvalidState(String),
}

impl From<OperationError> for ReplayError {
    fn from(err: OperationError) -> Self {
        ReplayError::OperationFailed(err)
    }
}
