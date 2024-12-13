use crate::crdt::{Delta, Operation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Profile {
    pub user_id: Uuid,
    pub avatar_url: Option<String>,
    pub title: Option<String>,
    pub bio: Option<String>,
    pub location: Option<String>,
    pub skills: Vec<String>,
    pub experience: Vec<Experience>,
    pub education: Vec<Education>,
    pub languages: Vec<Language>,
    pub social_links: Vec<SocialLink>,
    pub version: semver::Version,
    pub updated_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Experience {
    pub id: Uuid,
    pub company: String,
    pub title: String,
    pub start_date: String,
    pub end_date: Option<String>,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Education {
    pub id: Uuid,
    pub school: String,
    pub degree: String,
    pub field: String,
    pub start_date: String,
    pub end_date: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Language {
    pub name: String,
    pub level: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SocialLink {
    pub platform: String,
    pub url: String,
}

impl Profile {
    pub fn new(user_id: Uuid) -> Self {
        Self {
            user_id,
            avatar_url: None,
            title: None,
            bio: None,
            location: None,
            skills: Vec::new(),
            experience: Vec::new(),
            education: Vec::new(),
            languages: Vec::new(),
            social_links: Vec::new(),
            version: semver::Version::new(0, 1, 0),
            updated_at: chrono::Utc::now().timestamp(),
        }
    }

    pub fn to_delta(&self) -> Delta {
        let content = bincode::serialize(self).unwrap();
        Delta::new(Operation::Insert { position: 0 }, content)
    }

    pub fn from_delta(delta: &Delta) -> Result<Self, bincode::Error> {
        bincode::deserialize(&delta.content)
    }
}
