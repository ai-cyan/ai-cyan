mod api;
mod config;
mod middleware;
mod models;
mod services;

use axum::serve;
use axum::{
    routing::{get, post},
    Router,
};
use cyan_internal::auth::AuthService;
use sqlx::PgPool;
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

#[derive(Clone)]
pub struct AppState {
    pool: PgPool,
    auth_service: AuthService,
}

#[tokio::main]
async fn main() {
    // 加载配置
    let settings = config::Settings::new().expect("Failed to load settings");

    // 初始化数据库连接
    let pool = PgPool::connect(&settings.database_url)
        .await
        .expect("Failed to connect to database");

    // 初始化认证服务
    let auth_service = AuthService::new(settings.jwt_secret);

    // 应用状态
    let state = AppState { pool, auth_service };

    // 创建路由
    let app = Router::<AppState>::new()
        .nest("/api/auth", api::auth::router())
        .layer(CorsLayer::permissive())
        .with_state(state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr).await.unwrap();
    println!("listening on {}", addr);

    serve::serve(listener, app.into_make_service())
        .await
        .unwrap();
}
