use super::Delta;
use std::collections::BTreeMap;

pub struct DeltaRope {
    content: Vec<u8>,
    operations: Vec<Delta>,
    version_map: BTreeMap<semver::Version, usize>,
}

impl DeltaRope {
    pub fn new() -> Self {
        Self {
            content: Vec::new(),
            operations: Vec::new(),
            version_map: BTreeMap::new(),
        }
    }

    pub fn apply(&mut self, delta: Delta) -> Result<(), CRDTError> {
        match delta.operation {
            Operation::Insert { position } => {
                self.content
                    .splice(position..position, delta.content.iter().cloned());
            }
            Operation::Delete { position, length } => {
                self.content.drain(position..position + length);
            }
            Operation::Update { position, length } => {
                self.content
                    .splice(position..position + length, delta.content.iter().cloned());
            }
        }

        self.operations.push(delta.clone());
        self.version_map
            .insert(delta.version.clone(), self.operations.len() - 1);
        Ok(())
    }
}
