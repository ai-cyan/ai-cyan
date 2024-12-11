use cyan_internal::auth::AuthService;
use uuid::Uuid;

#[test]
fn test_password_hash() {
    let auth_service = AuthService::new("test_secret".to_string());
    let password = "test_password";

    let hash_result = auth_service.hash_password(password);
    assert!(hash_result.is_ok());

    let hash = hash_result.unwrap();
    let verify_result = auth_service.verify_password(&hash, password);
    assert!(verify_result.is_ok());
    assert!(verify_result.unwrap());
}

#[test]
fn test_jwt_token() {
    let auth_service = AuthService::new("test_secret".to_string());
    let user_id = Uuid::new_v4();
    let email = "test@example.com".to_string();
    let role = "user".to_string();

    // 测试生成 token
    let token_result = auth_service.generate_token(user_id, email.clone(), role.clone());
    assert!(token_result.is_ok());
    let token = token_result.unwrap();

    // 测试验证 token
    let claims_result = auth_service.verify_token(&token);
    assert!(claims_result.is_ok());

    let claims = claims_result.unwrap();
    assert_eq!(claims.sub, user_id);
    assert_eq!(claims.email, email);
    assert_eq!(claims.role, role);
}

#[test]
fn test_invalid_token() {
    let auth_service = AuthService::new("test_secret".to_string());
    let result = auth_service.verify_token("invalid_token");
    assert!(result.is_err());
}
