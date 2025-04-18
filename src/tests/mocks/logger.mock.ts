// 🧪 Mocked logger utility used for unit tests
export const mockLogger = {
  info: jest.fn(), // ℹ️ Mock for the "info" log method
  error: jest.fn(), // ❌ Mock for the "error" log method
};

// 🧼 Replace the original logger with the mocked version during tests
jest.mock('../../config/logger', () => mockLogger); // 🔁 Ensures any import of the logger will use the mock instead
