use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use time::Duration;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: Uuid, // user id
    pub email: String,
    pub role: String,
    pub exp: i64,
}

#[derive(Clone)]
pub struct AuthService {
    jwt_secret: String,
    jwt_expiration: Duration,
}

impl AuthService {
    pub fn new(jwt_secret: String) -> Self {
        Self {
            jwt_secret,
            jwt_expiration: Duration::hours(24),
        }
    }

    pub fn hash_password(&self, password: &str) -> Result<String, argon2::password_hash::Error> {
        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        Ok(argon2
            .hash_password(password.as_bytes(), &salt)?
            .to_string())
    }

    pub fn verify_password(
        &self,
        hash: &str,
        password: &str,
    ) -> Result<bool, argon2::password_hash::Error> {
        let parsed_hash = PasswordHash::new(hash)?;
        Ok(Argon2::default()
            .verify_password(password.as_bytes(), &parsed_hash)
            .is_ok())
    }

    pub fn generate_token(
        &self,
        user_id: Uuid,
        email: String,
        role: String,
    ) -> Result<String, jsonwebtoken::errors::Error> {
        let expiration = time::OffsetDateTime::now_utc() + self.jwt_expiration;

        let claims = Claims {
            sub: user_id,
            email,
            role,
            exp: expiration.unix_timestamp(),
        };

        encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(self.jwt_secret.as_bytes()),
        )
    }

    pub fn verify_token(&self, token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
        let decoded = decode::<Claims>(
            token,
            &DecodingKey::from_secret(self.jwt_secret.as_bytes()),
            &Validation::default(),
        )?;

        Ok(decoded.claims)
    }
}
