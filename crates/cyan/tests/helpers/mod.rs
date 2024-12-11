use sqlx::PgPool;
use std::sync::Once;

static INIT: Once = Once::new();

pub async fn setup_test_db() -> PgPool {
    INIT.call_once(|| {
        dotenv::dotenv().ok();
    });

    let database_url = std::env::var("TEST_DATABASE_URL")
        .unwrap_or_else(|_| "postgres://postgres:postgres@localhost/cyan_test".to_string());

    let pool = PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to test database");

    // 运行迁移
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("Failed to migrate test database");

    pool
}
