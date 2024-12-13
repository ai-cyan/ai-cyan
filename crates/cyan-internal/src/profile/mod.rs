use crate::crdt::{CRDTStore, Delta, Operation};
use crate::domain::profile::Profile;
use thiserror::Error;
use uuid::Uuid;

#[derive(Error, Debug)]
pub enum ProfileError {
    #[error("Profile not found")]
    NotFound,
    #[error("CRDT error: {0}")]
    CRDTError(String),
    #[error("Storage error")]
    StorageError,
}

pub struct ProfileService {
    store: CRDTStore,
}

impl ProfileService {
    pub fn new(store: CRDTStore) -> Self {
        Self { store }
    }

    pub async fn create_profile(&mut self, user_id: Uuid) -> Result<Profile, ProfileError> {
        let profile = Profile::new(user_id);
        let delta = profile.to_delta();

        self.store
            .apply_delta("profiles", delta)
            .await
            .map_err(|e| ProfileError::CRDTError(e.to_string()))?;

        Ok(profile)
    }

    pub async fn get_profile(&self, user_id: Uuid) -> Result<Profile, ProfileError> {
        let content = self
            .store
            .get_collection("profiles")
            .await
            .map_err(|e| ProfileError::CRDTError(e.to_string()))?;

        if let Ok(profiles) = bincode::deserialize::<Vec<Profile>>(&content) {
            profiles
                .into_iter()
                .find(|p| p.user_id == user_id)
                .ok_or(ProfileError::NotFound)
        } else {
            Err(ProfileError::NotFound)
        }
    }

    pub async fn update_profile(&mut self, profile: Profile) -> Result<(), ProfileError> {
        let delta = profile.to_delta();
        self.store
            .apply_delta("profiles", delta)
            .await
            .map_err(|e| ProfileError::CRDTError(e.to_string()))
    }
}
