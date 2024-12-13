// crates/cyan-internal/src/ops/mod.rs
use anyhow::Result;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use uuid::Uuid;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum VerificationStatus {
    Pending,
    Verified,
    Rejected,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JobData {
    title: String,
    description: String,
    requirements: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DeltaRope {
    content: BTreeMap<char, bool>,
    version: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Operation {
    // 技能相关操作
    SkillDeclare {
        id: Uuid,
        name: String,
        level: u8,
        timestamp: DateTime<Utc>,
    },
    SkillVerify {
        skill_id: Uuid,
        verifier: Uuid,
        status: VerificationStatus,
        timestamp: DateTime<Utc>,
    },

    // 工作相关操作
    JobPost {
        id: Uuid,
        data: JobData,
        timestamp: DateTime<Utc>,
    },
    JobUpdate {
        id: Uuid,
        delta: DeltaRope,
        timestamp: DateTime<Utc>,
    },

    // 用户档案操作
    ProfileUpdate {
        user_id: Uuid,
        delta: DeltaRope,
        timestamp: DateTime<Utc>,
    },
}

impl DeltaRope {
    pub fn apply(&mut self, op: Operation) -> Result<()> {
        // 实现 CRDT 合并逻辑
        Ok(())
    }

    pub fn to_bytes(&self) -> Vec<u8> {
        bincode::serialize(self).unwrap_or_default()
    }
}
