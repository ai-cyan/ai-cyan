// 文件系统存储
use crate::crdt::Delta;
use std::path::PathBuf;

pub struct FileStore {
    root: PathBuf,
}

impl FileStore {
    pub async fn save_delta(&self, collection: &str, delta: &Delta) -> std::io::Result<()> {
        let path = self.root.join(collection).join(format!("{}.bin", delta.id));

        let data = bincode::serialize(delta).unwrap();
        tokio::fs::write(path, data).await
    }

    pub async fn load_deltas(&self, collection: &str) -> std::io::Result<Vec<Delta>> {
        let mut deltas = Vec::new();
        let dir = self.root.join(collection);

        let mut entries = tokio::fs::read_dir(&dir).await?;
        while let Some(entry) = entries.next_entry().await? {
            let data = tokio::fs::read(entry.path()).await?;
            if let Ok(delta) = bincode::deserialize(&data) {
                deltas.push(delta);
            }
        }

        Ok(deltas)
    }
}
