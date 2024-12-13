use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Delta {
    id: Uuid,
    timestamp: i64,
    version: semver::Version,
    operation: Operation,
    content: Vec<u8>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Operation {
    Insert { position: usize },
    Delete { position: usize, length: usize },
    Update { position: usize, length: usize },
}

impl Delta {
    pub fn new(operation: Operation, content: Vec<u8>) -> Self {
        Self {
            id: Uuid::new_v4(),
            timestamp: chrono::Utc::now().timestamp(),
            version: semver::Version::new(0, 1, 0),
            operation,
            content,
        }
    }
}
