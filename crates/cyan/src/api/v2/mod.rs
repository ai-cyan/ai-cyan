use axum::{extract::Path, http::StatusCode, response::Json};
use serde::Serialize;
use uuid::Uuid;

#[derive(Serialize)]
pub struct SkillV2 {
    id: Uuid,
    name: String,
    level: u8,
    verified: bool,
}

pub async fn get_skill_v2(Path(id): Path<Uuid>) -> Result<Json<SkillV2>, StatusCode> {
    // TODO: 实现 v2 技能查询逻辑
    Ok(Json(SkillV2 {
        id,
        name: "Test Skill".to_string(),
        level: 1,
        verified: false,
    }))
}
