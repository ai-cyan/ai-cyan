use axum::{extract::Path, http::StatusCode, response::Json};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize)]
pub struct Skill {
    id: Uuid,
    name: String,
    level: u8,
}

#[derive(Deserialize)]
pub struct CreateSkill {
    name: String,
    level: u8,
}

pub async fn get_skill_v1(Path(id): Path<Uuid>) -> Result<Json<Skill>, StatusCode> {
    // TODO: 实现技能查询逻辑
    Ok(Json(Skill {
        id,
        name: "Test Skill".to_string(),
        level: 1,
    }))
}

pub async fn create_skill_v1(Json(payload): Json<CreateSkill>) -> Result<Json<Skill>, StatusCode> {
    // TODO: 实现技能创建逻辑
    Ok(Json(Skill {
        id: Uuid::new_v4(),
        name: payload.name,
        level: payload.level,
    }))
}
