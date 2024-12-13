// 技能验证
use crate::crdt::{Delta, Operation};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Skill {
    pub id: Uuid,
    pub name: String,
    pub level: String,
    pub verifications: Vec<Verification>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Verification {
    pub id: Uuid,
    pub verifier_id: Uuid,
    pub timestamp: i64,
    pub comment: Option<String>,
}

impl Skill {
    pub fn to_delta(&self) -> Delta {
        let content = bincode::serialize(self).unwrap();
        Delta::new(Operation::Insert { position: 0 }, content)
    }

    pub fn from_delta(delta: &Delta) -> Result<Self, bincode::Error> {
        bincode::deserialize(&delta.content)
    }
}
