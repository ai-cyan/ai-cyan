// crates/cyan-wasm/src/sync/mod.rs
#[wasm_bindgen]
pub struct SyncManager {
    rope: DeltaRope,
    pending_ops: Vec<Operation>,
}

#[wasm_bindgen]
impl SyncManager {
    pub fn apply_local(&mut self, op: JsValue) -> Result<(), JsValue> {
        let op: Operation = serde_wasm_bindgen::from_value(op)?;
        self.rope.apply(op.clone())?;
        self.pending_ops.push(op);
        Ok(())
    }

    pub fn sync(&mut self) -> Result<(), JsValue> {
        // 与服务器同步操作
    }
}
