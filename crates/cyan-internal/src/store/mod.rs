// crates/cyan-internal/src/store/mod.rs
use crate::delta::{DeltaRope, Operation};
use anyhow::{Error, Result};
use std::path::PathBuf;
use tokio::fs::OpenOptions;
use tokio::io::AsyncWriteExt;

pub struct Store {
    path: PathBuf,
    current_version: u64,
}

impl Store {
    pub fn new(path: PathBuf) -> Self {
        Self {
            path,
            current_version: 0,
        }
    }

    pub async fn append(&self, op: Operation) -> Result<()> {
        let bytes = bincode::serialize(&op).map_err(Error::from)?;
        let mut file = OpenOptions::new()
            .create(true)
            .append(true)
            .open(&self.path)
            .await?;
        file.write_all(&bytes).await?;
        Ok(())
    }

    pub async fn load(&self) -> Result<DeltaRope> {
        // TODO: 实现加载逻辑
        unimplemented!("Load operation not implemented yet")
    }
}
