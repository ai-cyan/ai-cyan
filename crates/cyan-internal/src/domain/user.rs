// 用户模型

use crate::crdt::{Delta, Operation};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub name: String,
    pub skills: Vec<Uuid>, // 关联的技能ID
    pub verified: bool,
    pub created_at: i64,
    pub updated_at: i64,
}

impl User {
    pub fn to_delta(&self) -> Delta {
        let content = bincode::serialize(self).unwrap();
        Delta::new(Operation::Insert { position: 0 }, content)
    }

    pub fn from_delta(delta: &Delta) -> Result<Self, bincode::Error> {
        bincode::deserialize(&delta.content)
    }
}
