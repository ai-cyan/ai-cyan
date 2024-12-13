use std::sync::Arc;
use tokio::sync::RwLock;
use cyan_internal::{
    crdt::CRDTStore,
    storage::fs::FileStore,
    auth::AuthService,
};

pub struct AppState {
    pub store: Arc<RwLock<CRDTStore>>,
    pub auth_service: AuthService,
}

impl AppState {
    pub async fn new(storage_path: PathBuf, jwt_secret: String) -> Self {
        let storage = FileStore::new(storage_path);
        let store = CRDTStore::new(storage);
        
        Self {
            store: Arc::new(RwLock::new(store)),
            auth_service: AuthService::new(jwt_secret),
        }
    }
} 