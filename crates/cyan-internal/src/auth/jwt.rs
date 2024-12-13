use jsonwebtoken::{decode, encode, errors::Error, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: Uuid,       // 用户ID
    pub email: String,   // 邮箱
    pub role: String,    // 角色
    pub exp: usize,      // 过期时间
    pub version: String, // API版本
}

pub struct JwtAuth {
    encoding_key: EncodingKey,
    decoding_key: DecodingKey,
}

impl JwtAuth {
    pub fn new(secret: &[u8]) -> Self {
        Self {
            encoding_key: EncodingKey::from_secret(secret),
            decoding_key: DecodingKey::from_secret(secret),
        }
    }

    pub fn generate_token(
        &self,
        user_id: Uuid,
        email: String,
        role: String,
    ) -> Result<String, Error> {
        let exp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs() as usize
            + 24 * 60 * 60; // 24小时过期

        let claims = Claims {
            sub: user_id,
            email,
            role,
            exp,
            version: "0.1.0".to_string(),
        };

        encode(&Header::default(), &claims, &self.encoding_key)
    }

    pub fn verify_token(&self, token: &str) -> Result<Claims, Error> {
        let validation = Validation::default();
        decode::<Claims>(token, &self.decoding_key, &validation).map(|data| data.claims)
    }
}
