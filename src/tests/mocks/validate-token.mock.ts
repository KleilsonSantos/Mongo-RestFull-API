import jwt from 'jsonwebtoken';

const ENV = process.env;

export function generateMockToken(expiresIn = '1d'): string {
  const payload = {
    email: 'test-user-email',
    password: ENV['MOCK_PASSWORD_USER'],
    role: 'admin',
  };

  return jwt.sign(payload, process.env.JWT_SECRET ?? 'test-secret', {
    expiresIn: '1d',
  });
}
