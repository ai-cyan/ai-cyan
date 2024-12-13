// crates/cyan/src/api/mod.rs
use axum::{
    routing::{get, post},
    Router,
};

pub mod v1;
pub mod v2;

use v1::{create_skill_v1, get_skill_v1};
use v2::get_skill_v2;

pub fn routes() -> Router {
    Router::new()
        .route("/api/v1/skills/:id", get(get_skill_v1))
        .route("/api/v1/skills", post(create_skill_v1))
        .route("/api/v2/skills/:id", get(get_skill_v2))
}
