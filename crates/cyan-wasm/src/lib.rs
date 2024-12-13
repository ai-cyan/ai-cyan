use wasm_bindgen::prelude::*;
use cyan_internal::{
    domain::{User, Skill},
    crdt::Delta,
};

#[wasm_bindgen]
pub struct CyanClient {
    store: CRDTStore,
}

#[wasm_bindgen]
impl CyanClient {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            store: CRDTStore::new(FileStore::new("".into())),
        }
    }

    #[wasm_bindgen]
    pub async fn sync_skills(&mut self) -> Result<JsValue, JsValue> {
        let skills = self.store.get_collection("skills").await?;
        Ok(serde_wasm_bindgen::to_value(&skills)?)
    }
}

#[wasm_bindgen]
pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
