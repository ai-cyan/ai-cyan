// 认证API

use axum::{
    Router,
    extract::{State, Json},
    http::StatusCode,
};
use serde::{Deserialize, Serialize};
use crate::AppState;

#[derive(Debug, Deserialize)]
pub struct SignupRequest {
    email: String,
    password: String,
    name: String,
}

#[derive(Debug, Serialize)]
pub struct AuthResponse {
    token: String,
    user: User,
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/signup", post(signup))
        .route("/signin", post(signin))
}

async fn signup(
    State(state): State<AppState>,
    Json(req): Json<SignupRequest>,
) -> Result<Json<AuthResponse>, StatusCode> {
    let user = state.auth_service
        .register(req.email, req.password, req.name)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let token = state.auth_service
        .generate_token(user.id, user.email.clone(), "user".to_string())
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(AuthResponse { token, user }))
}
