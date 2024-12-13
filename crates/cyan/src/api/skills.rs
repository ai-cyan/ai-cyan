// crates/cyan/src/api/skills.rs
pub async fn verify_skill(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<SkillVerification>,
) -> Result<Json<VerificationResponse>> {
    let op = Operation::SkillVerify {
        skill_id: payload.skill_id,
        verifier: payload.verifier_id,
        status: payload.status,
        timestamp: Utc::now(),
    };

    state.apply_operation(op).await?;

    Ok(Json(VerificationResponse::new()))
}

// crates/cyan/src/state.rs
pub struct AppState {
    store: Store,
    rope: DeltaRope,
}

impl AppState {
    pub async fn apply_operation(&self, op: Operation) -> Result<()> {
        self.rope.apply(op.clone())?;
        self.store.append(op).await?;
        Ok(())
    }
}
