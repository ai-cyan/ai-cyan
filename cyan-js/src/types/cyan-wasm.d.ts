declare module 'cyan-wasm' {
  export function add(left: number, right: number): number;
  export function greet(name: string): string;
  export default function init(): Promise<void>;
} 