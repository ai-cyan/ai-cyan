// 导入 WASM 模块
import init, { add, greet } from 'cyan-wasm';

// 初始化函数
export async function initialize() {
    await init();
}

// 导出 WASM 函数
export { add, greet };

// 导出其他 API
export const version = '0.1.0'; 