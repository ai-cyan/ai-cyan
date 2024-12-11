use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Job {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub company_id: Uuid,
    pub created_at: DateTime<Utc>,
    pub salary_min: Option<i32>,
    pub salary_max: Option<i32>,
    pub location: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateJob {
    pub title: String,
    pub description: String,
    pub salary_min: Option<i32>,
    pub salary_max: Option<i32>,
    pub location: String,
} 