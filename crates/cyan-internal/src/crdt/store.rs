use super::{Delta, DeltaRope, Operation};
use crate::storage::fs::FileStore;
use std::collections::HashMap;
use uuid::Uuid;

pub struct CRDTStore {
    ropes: HashMap<String, DeltaRope>,
    storage: FileStore,
}

impl CRDTStore {
    pub fn new(storage: FileStore) -> Self {
        Self {
            ropes: HashMap::new(),
            storage,
        }
    }

    pub async fn apply_delta(&mut self, collection: &str, delta: Delta) -> Result<(), CRDTError> {
        let rope = self
            .ropes
            .entry(collection.to_string())
            .or_insert_with(DeltaRope::new);

        rope.apply(delta.clone())?;
        self.storage.save_delta(collection, &delta).await?;
        Ok(())
    }

    pub async fn get_collection(&self, collection: &str) -> Result<Vec<u8>, CRDTError> {
        if let Some(rope) = self.ropes.get(collection) {
            Ok(rope.content.clone())
        } else {
            let deltas = self.storage.load_deltas(collection).await?;
            let mut rope = DeltaRope::new();
            for delta in deltas {
                rope.apply(delta)?;
            }
            Ok(rope.content.clone())
        }
    }
}
