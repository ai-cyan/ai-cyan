import { describe, it, expect, beforeAll } from 'vitest';
import { version, initialize, add, greet } from '../src';

describe('cyan-js', () => {
  beforeAll(async () => {
    await initialize();
  });

  it('should export version', () => {
    expect(version).toBe('0.1.0');
  });

  it('should add numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should greet', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
}); 