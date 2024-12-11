use crate::AppState;
use axum::{
    async_trait,
    extract::{FromRequestParts, State},
    http::{request::Parts, StatusCode},
    response::{IntoResponse, Response},
    RequestPartsExt,
};
use axum_extra::headers::{authorization::Bearer, Authorization};
use cyan_internal::auth::Claims;
use uuid::Uuid;

#[derive(Debug)]
pub struct AuthUser {
    pub user_id: Uuid,
    pub email: String,
    pub role: String,
}

#[async_trait]
impl<S> FromRequestParts<S> for AuthUser
where
    S: Send + Sync + AsRef<AppState>,
{
    type Rejection = Response;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let auth_header = parts
            .headers
            .get(axum::http::header::AUTHORIZATION)
            .and_then(|value| value.to_str().ok())
            .and_then(|value| value.strip_prefix("Bearer "))
            .ok_or_else(|| StatusCode::UNAUTHORIZED.into_response())?;

        let claims = state
            .as_ref()
            .auth_service
            .verify_token(auth_header)
            .map_err(|_| StatusCode::UNAUTHORIZED.into_response())?;

        Ok(AuthUser {
            user_id: claims.sub,
            email: claims.email,
            role: claims.role,
        })
    }
}
