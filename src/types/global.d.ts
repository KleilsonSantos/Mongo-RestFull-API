declare namespace NodeJS {
  interface Global {
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
  }
}
