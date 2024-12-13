use criterion::{black_box, criterion_group, criterion_main, Criterion};
use cyan_internal::delta::DeltaRope;
use uuid::Uuid;

pub fn delta_benchmark(c: &mut Criterion) {
    let site_id = Uuid::new_v4();
    let mut rope = DeltaRope::new(site_id);

    c.bench_function("insert_single_char", |b| {
        b.iter(|| {
            rope.insert(0, black_box('a'));
        });
    });

    c.bench_function("insert_text_100", |b| {
        b.iter(|| {
            rope.insert_text(0, black_box("Hello World! ".repeat(8).as_str()));
        });
    });

    c.bench_function("concurrent_ops", |b| {
        let mut rope1 = DeltaRope::new(Uuid::new_v4());
        let mut rope2 = DeltaRope::new(Uuid::new_v4());
        b.iter(|| {
            let op1 = rope1.insert(0, 'A');
            let op2 = rope2.insert(0, 'B');
            rope2.apply_operation(op1).unwrap();
            rope1.apply_operation(op2).unwrap();
        });
    });
}

criterion_group!(benches, delta_benchmark);
criterion_main!(benches);
