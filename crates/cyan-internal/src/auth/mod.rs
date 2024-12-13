use crate::crdt::{Delta, DeltaRope, Operation};
use crate::domain::user::User;
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use thiserror::Error;
use uuid::Uuid;

mod jwt;
use jwt::JwtAuth;

#[derive(Error, Debug)]
pub enum AuthError {
    #[error("Invalid credentials")]
    InvalidCredentials,
    #[error("User not found")]
    UserNotFound,
    #[error("Token error: {0}")]
    TokenError(String),
    #[error("Storage error")]
    StorageError,
}

pub struct AuthService {
    jwt: JwtAuth,
    user_store: DeltaRope,
}

impl AuthService {
    pub fn new(secret: String) -> Self {
        Self {
            jwt: JwtAuth::new(secret.as_bytes()),
            user_store: DeltaRope::new(),
        }
    }

    pub async fn register(
        &mut self,
        email: String,
        password: String,
        name: String,
    ) -> Result<User, AuthError> {
        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        let password_hash = argon2
            .hash_password(password.as_bytes(), &salt)
            .map_err(|_| AuthError::InvalidCredentials)?
            .to_string();

        let user = User {
            id: Uuid::new_v4(),
            email,
            name,
            password_hash,
            created_at: chrono::Utc::now().timestamp(),
            updated_at: chrono::Utc::now().timestamp(),
        };

        let delta = Delta::new(
            Operation::Insert { position: 0 },
            bincode::serialize(&user).unwrap(),
        );

        self.user_store
            .apply(delta)
            .map_err(|_| AuthError::StorageError)?;

        Ok(user)
    }

    pub async fn login(&self, email: String, password: String) -> Result<String, AuthError> {
        let user = self
            .find_user_by_email(&email)
            .ok_or(AuthError::UserNotFound)?;

        let parsed_hash =
            PasswordHash::new(&user.password_hash).map_err(|_| AuthError::InvalidCredentials)?;

        Argon2::default()
            .verify_password(password.as_bytes(), &parsed_hash)
            .map_err(|_| AuthError::InvalidCredentials)?;

        self.jwt
            .generate_token(user.id, user.email.clone(), "user".to_string())
            .map_err(|e| AuthError::TokenError(e.to_string()))
    }

    fn find_user_by_email(&self, email: &str) -> Option<User> {
        // 从 CRDT 存储中查找用户
        let content = self.user_store.content.clone();
        if let Ok(users) = bincode::deserialize::<Vec<User>>(&content) {
            users.into_iter().find(|u| u.email == email)
        } else {
            None
        }
    }
}
