use axum::{
    extract::{Path, State},
    Json, Router,
};
use cyan_internal::domain::profile::Profile;
use uuid::Uuid;
use crate::AppState;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/profile/:user_id", get(get_profile))
        .route("/profile/:user_id", put(update_profile))
}

async fn get_profile(
    State(state): State<AppState>,
    Path(user_id): Path<Uuid>,
) -> Result<Json<Profile>, StatusCode> {
    state
        .profile_service
        .get_profile(user_id)
        .await
        .map(Json)
        .map_err(|_| StatusCode::NOT_FOUND)
}

async fn update_profile(
    State(state): State<AppState>,
    Path(user_id): Path<Uuid>,
    Json(mut profile): Json<Profile>,
) -> StatusCode {
    profile.updated_at = chrono::Utc::now().timestamp();
    
    state
        .profile_service
        .update_profile(profile)
        .await
        .map(|_| StatusCode::OK)
        .unwrap_or(StatusCode::INTERNAL_SERVER_ERROR)
} 