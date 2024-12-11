use axum::{
    body::Body,
    http::{Request, StatusCode},
};
use cyan_internal::auth::AuthService;
use serde_json::json;
use sqlx::PgPool;
use tower::ServiceExt;

use cyan::{api::auth::router, AppState};

async fn setup() -> AppState {
    let database_url = std::env::var("TEST_DATABASE_URL")
        .unwrap_or_else(|_| "postgres://postgres:postgres@localhost/cyan_test".to_string());

    AppState {
        pool: PgPool::connect(&database_url)
            .await
            .expect("Failed to connect to test database"),
        auth_service: AuthService::new("test_secret".to_string()),
    }
}

#[tokio::test]
async fn test_auth_register() {
    let state = setup().await;
    let app = router().with_state(state);

    let request = Request::builder()
        .method("POST")
        .uri("/register")
        .header("Content-Type", "application/json")
        .body(Body::from(
            json!({
                "email": "test@example.com",
                "password": "password123",
                "name": "Test User"
            })
            .to_string(),
        ))
        .unwrap();

    let response = app.oneshot(request).await.unwrap();
    assert_eq!(response.status(), StatusCode::CREATED);
}

#[tokio::test]
async fn test_auth_login() {
    let state = setup().await;
    let app = router().with_state(state);

    let request = Request::builder()
        .method("POST")
        .uri("/login")
        .header("Content-Type", "application/json")
        .body(Body::from(
            json!({
                "email": "test@example.com",
                "password": "password123"
            })
            .to_string(),
        ))
        .unwrap();

    let response = app.oneshot(request).await.unwrap();
    assert_eq!(response.status(), StatusCode::OK);
}
