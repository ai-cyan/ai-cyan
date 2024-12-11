use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Settings {
    pub database_url: String,
    pub jwt_secret: String,
    pub redis_url: Option<String>,
}

impl Settings {
    pub fn new() -> Result<Self, config::ConfigError> {
        let settings = config::Config::builder()
            .add_source(config::Environment::default())
            .build()?;

        settings.try_deserialize()
    }
}
