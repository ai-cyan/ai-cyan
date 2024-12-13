#[cfg(test)]
mod tests {
    use super::*;
    use std::thread;
    use std::time::Duration;
    use uuid::Uuid;

    fn setup() -> (DeltaRope, DeltaRope) {
        let site1_id = Uuid::new_v4();
        let site2_id = Uuid::new_v4();
        (DeltaRope::new(site1_id), DeltaRope::new(site2_id))
    }

    #[test]
    fn test_basic_insert() {
        let (mut rope1, _) = setup();

        rope1.insert(0, 'H');
        rope1.insert(1, 'i');

        assert_eq!(rope1.to_string(), "Hi");
    }

    #[test]
    fn test_delete() {
        let (mut rope1, _) = setup();

        rope1.insert(0, 'H');
        rope1.insert(1, 'i');
        rope1.delete(0);

        assert_eq!(rope1.to_string(), "i");
    }

    #[test]
    fn test_concurrent_edits() {
        let (mut rope1, mut rope2) = setup();

        // Site 1: Insert "Hello"
        let op1 = rope1.insert(0, 'H');
        let op2 = rope1.insert(1, 'e');
        let op3 = rope1.insert(2, 'l');

        // Site 2: Insert "World"
        let op4 = rope2.insert(0, 'W');
        let op5 = rope2.insert(1, 'o');
        let op6 = rope2.insert(2, 'r');

        // 同步操作
        rope2.apply_operation(op1);
        rope2.apply_operation(op2);
        rope2.apply_operation(op3);

        rope1.apply_operation(op4);
        rope1.apply_operation(op5);
        rope1.apply_operation(op6);

        // 验证两个站点的内容一致
        assert_eq!(rope1.to_string(), rope2.to_string());
    }

    #[test]
    fn test_concurrent_delete() {
        let (mut rope1, mut rope2) = setup();

        // 初始化相同内容
        let ops = vec![
            rope1.insert(0, 'H'),
            rope1.insert(1, 'e'),
            rope1.insert(2, 'l'),
            rope1.insert(3, 'l'),
            rope1.insert(4, 'o'),
        ];

        // 同步到rope2
        for op in ops {
            rope2.apply_operation(op);
        }

        // Site 1 删除 'H'
        let delete1 = rope1.delete(0).unwrap();

        // Site 2 删除 'o'
        let delete2 = rope2.delete(4).unwrap();

        // 交叉应用删除操作
        rope2.apply_operation(delete1);
        rope1.apply_operation(delete2);

        // 验证最终一致性
        assert_eq!(rope1.to_string(), rope2.to_string());
        assert_eq!(rope1.to_string(), "ell");
    }

    #[test]
    fn test_compression() {
        let (mut rope1, _) = setup();

        // 插入一些内容
        for c in "Hello World".chars() {
            rope1.insert(rope1.stats().total_chars, c);
        }

        // 删除一些字符
        rope1.delete(0); // 删除 'H'
        rope1.delete(4); // 删除 'W'

        let stats_before = rope1.stats();
        let compressed_count = rope1.compress();
        let stats_after = rope1.stats();

        assert_eq!(compressed_count, 2); // 应该压缩了2个删除的字符
        assert_eq!(stats_after.deleted_chars, 0);
        assert_eq!(rope1.to_string(), "ello orld");
    }

    #[test]
    fn test_index_cache() {
        let (mut rope1, _) = setup();

        // 插入足够多的字符以测试缓存
        for c in "abcdefghijklmnopqrstuvwxyz".chars() {
            rope1.insert(rope1.stats().total_chars, c);
        }

        // 第一次查找应该更新缓存
        let pos1 = rope1.find_position_by_index(10);
        assert!(pos1.is_some());

        // 第二次查找应该命中缓存
        let stats_before = rope1.stats();
        let pos2 = rope1.find_position_by_index(10);
        let stats_after = rope1.stats();

        assert_eq!(pos1, pos2);
        assert_eq!(stats_before.cache_size, stats_after.cache_size);
    }

    #[test]
    fn test_concurrent_with_compression() {
        let (mut rope1, mut rope2) = setup();

        // Site 1: 插入并删除一些内容
        let mut ops1 = Vec::new();
        for c in "Hello".chars() {
            ops1.push(rope1.insert(rope1.stats().total_chars, c));
        }
        ops1.push(rope1.delete(0).unwrap()); // 删除 'H'

        // Site 2: 插入一些内容
        let mut ops2 = Vec::new();
        for c in "World".chars() {
            ops2.push(rope2.insert(rope2.stats().total_chars, c));
        }

        // 压缩 rope1
        rope1.compress();

        // 同步操作
        for op in ops2 {
            rope1.apply_operation(op.clone());
        }
        for op in ops1 {
            rope2.apply_operation(op.clone());
        }

        // 验证最终一致性
        assert_eq!(rope1.to_string(), rope2.to_string());
    }

    #[test]
    fn test_batch_operations() {
        let (mut rope1, _) = setup();

        // 测试批量插入
        let ops = rope1.insert_text(0, "Hello World");
        assert_eq!(ops.len(), 11); // "Hello World" 长度
        assert_eq!(rope1.to_string(), "Hello World");

        // 测试批量回滚
        rope1.begin_batch();
        rope1.insert(0, 'X');
        rope1.insert(1, 'Y');
        rope1.rollback_batch();
        assert_eq!(rope1.to_string(), "Hello World");
    }

    #[test]
    fn test_history_replay() {
        let (mut rope1, _) = setup();

        // 记录初始操作时间
        let start_time = Utc::now();
        std::thread::sleep(std::time::Duration::from_millis(10));

        // 执行一系列操作
        rope1.insert_text(0, "Hello");
        std::thread::sleep(std::time::Duration::from_millis(10));
        let mid_time = Utc::now();
        std::thread::sleep(std::time::Duration::from_millis(10));
        rope1.insert_text(5, " World");

        // 从中间时间点重放
        rope1.replay_from(mid_time).unwrap();
        assert_eq!(rope1.to_string(), "Hello World");

        // 从开始时间点重放
        rope1.replay_from(start_time).unwrap();
        assert_eq!(rope1.to_string(), "Hello World");
    }

    #[test]
    fn test_history_export_import() {
        let (mut rope1, mut rope2) = setup();

        // rope1 执行操作
        rope1.insert_text(0, "Hello World");
        rope1.delete(5);

        // 导出 rope1 的历史记录
        let history = rope1.export_history();

        // 将历史记录导入 rope2
        rope2.import_history(history).unwrap();

        // 验证两个rope内容一致
        assert_eq!(rope1.to_string(), rope2.to_string());
    }

    #[test]
    fn test_concurrent_batch_operations() {
        let (mut rope1, mut rope2) = setup();

        // Site 1: 批量插入
        let ops1 = rope1.insert_text(0, "Hello");

        // Site 2: 批量插入
        let ops2 = rope2.insert_text(0, "World");

        // 交叉应用批量操作
        for op in ops2 {
            rope1.apply_operation(op).unwrap();
        }
        for op in ops1 {
            rope2.apply_operation(op).unwrap();
        }

        // 验证最终一致性
        assert_eq!(rope1.to_string(), rope2.to_string());
    }

    #[test]
    fn test_empty_operations() {
        let (mut rope1, _) = setup();

        // 测试空字符串插入
        let ops = rope1.insert_text(0, "");
        assert!(ops.is_empty());
        assert_eq!(rope1.to_string(), "");

        // 测试在空rope上删除
        assert!(rope1.delete(0).is_none());
    }

    #[test]
    fn test_boundary_positions() {
        let (mut rope1, _) = setup();

        // 插入一些初始内容
        rope1.insert_text(0, "Hello");

        // 测试边界位置插入
        rope1.insert(0, 'X'); // 开头
        rope1.insert(6, 'Y'); // 结尾
        assert_eq!(rope1.to_string(), "XHelloY");

        // 测试越界位置插入
        let result = std::panic::catch_unwind(move || {
            rope1.insert(100, 'Z');
        });
        assert!(result.is_err());
    }

    #[test]
    fn test_concurrent_same_position() {
        let (mut rope1, mut rope2) = setup();

        // 两个站点在同一位置同时插入
        let op1 = rope1.insert(0, 'A');
        let op2 = rope2.insert(0, 'B');

        // 交叉应用操作
        rope2.apply_operation(op1.clone()).unwrap();
        rope1.apply_operation(op2.clone()).unwrap();

        // 验证两个站点最终状态一致
        assert_eq!(rope1.to_string(), rope2.to_string());

        // 内容顺序应该由站点ID决定
        let content = rope1.to_string();
        assert!(content == "AB" || content == "BA");
    }

    #[test]
    fn test_concurrent_delete_insert() {
        let (mut rope1, mut rope2) = setup();

        // 初始化内容
        let init_op = rope1.insert(0, 'X');
        rope2.apply_operation(init_op).unwrap();

        // Site 1 删除 X，同时 Site 2 在 X 后插入 Y
        let delete_op = rope1.delete(0).unwrap();
        let insert_op = rope2.insert(1, 'Y');

        // 交叉应用操作
        rope2.apply_operation(delete_op).unwrap();
        rope1.apply_operation(insert_op).unwrap();

        // 验证最终一致性
        assert_eq!(rope1.to_string(), rope2.to_string());
    }

    #[test]
    fn test_history_limit() {
        let (mut rope1, _) = setup();

        // 插入超过历史限制的操作
        for i in 0..2000 {
            rope1.insert(i, 'a');
        }

        // 验证历史记录不超过限制
        assert!(rope1.export_history().len() <= rope1.history_limit);
    }

    #[test]
    fn test_compression_with_concurrent_ops() {
        let (mut rope1, mut rope2) = setup();

        // 在rope1中创建大量删除
        for i in 0..100 {
            rope1.insert(i, 'a');
        }
        let mut delete_ops = Vec::new();
        for i in 0..50 {
            if let Some(op) = rope1.delete(i) {
                delete_ops.push(op);
            }
        }

        // rope2执行不同的操作
        let mut insert_ops = Vec::new();
        for i in 0..20 {
            insert_ops.push(rope2.insert(i, 'b'));
        }

        // 压缩rope1
        rope1.compress();

        // 应用rope2的操作到压缩后的rope1
        for op in insert_ops {
            rope1.apply_operation(op).unwrap();
        }

        // 应用rope1的删除操作到rope2
        for op in delete_ops {
            rope2.apply_operation(op).unwrap();
        }

        // 验证最终一致性
        assert_eq!(rope1.to_string(), rope2.to_string());
    }

    #[test]
    fn test_cache_invalidation() {
        let (mut rope1, _) = setup();

        // 创建足够多的内容以填充缓存
        for i in 0..200 {
            rope1.insert(i, 'a');
        }

        // 记录缓存大小
        let initial_cache_size = rope1.stats().cache_size;

        // 执行压缩
        rope1.compress();

        // 验证缓存被清空
        assert!(rope1.stats().cache_size < initial_cache_size);
    }

    #[test]
    fn test_batch_operation_atomicity() {
        let (mut rope1, _) = setup();

        rope1.begin_batch();
        rope1.insert(0, 'A');
        rope1.insert(1, 'B');
        // 模拟操作中的错误
        rope1.rollback_batch();

        // 验证回滚后状态
        assert_eq!(rope1.to_string(), "");
        assert!(rope1.pending_batch.is_none());
    }

    #[test]
    fn test_concurrent_batch_conflict_resolution() {
        let (mut rope1, mut rope2) = setup();

        // Site 1: 批量删除
        rope1.insert_text(0, "ABCDE");
        let delete_ops = vec![rope1.delete(0).unwrap(), rope1.delete(1).unwrap()];

        // Site 2: 批量插入在相同位置
        let insert_ops = rope2.insert_text(0, "XYZ");

        // 交叉应用操作
        for op in &delete_ops {
            rope2.apply_operation(op.clone()).unwrap();
        }
        for op in &insert_ops {
            rope1.apply_operation(op.clone()).unwrap();
        }

        // 验证最终一致性
        assert_eq!(rope1.to_string(), rope2.to_string());
    }
}
