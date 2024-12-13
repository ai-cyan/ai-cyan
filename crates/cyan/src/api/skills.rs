// 技能验证API
use crate::AppState;
use axum::{extract::State, Json, Router};
use cyan_internal::{
    crdt::DeltaRope,
    domain::skill::{Skill, Verification},
};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/skills", get(list_skills))
        .route("/skills/:id/verify", post(verify_skill))
}

async fn list_skills(State(state): State<AppState>) -> Json<Vec<Skill>> {
    let skills = state.skill_store.get_all().await.unwrap_or_default();

    Json(skills)
}

async fn verify_skill(
    State(state): State<AppState>,
    Path(skill_id): Path<Uuid>,
    Json(verification): Json<Verification>,
) -> StatusCode {
    state
        .skill_store
        .verify_skill(skill_id, verification)
        .await
        .map(|_| StatusCode::OK)
        .unwrap_or(StatusCode::INTERNAL_SERVER_ERROR)
}
