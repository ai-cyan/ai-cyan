// 认证相关API
use crate::models::user::CreateUser;
use crate::AppState;
use axum::{http::StatusCode, routing::post, Json, Router};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/register", post(register))
        .route("/login", post(login))
}

async fn register(Json(payload): Json<CreateUser>) -> Result<StatusCode, StatusCode> {
    // TODO: 实现注册逻辑
    Ok(StatusCode::CREATED)
}

async fn login() -> Result<StatusCode, StatusCode> {
    // TODO: 实现登录逻辑
    Ok(StatusCode::OK)
}
