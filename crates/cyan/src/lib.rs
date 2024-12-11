pub mod api;
pub mod config;
pub mod middleware;
pub mod models;
pub mod services;

use cyan_internal::auth::AuthService;
use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    pub auth_service: AuthService,
}

pub use crate::api::*;
