const ENV = process.env;

export const userExample = {
  email: 'admin@gmail.com',
  password: ENV['MOCK_PASSWORD_USER'],
  role: ENV['MOCK_ROLE_1'],
};

export const responseUser = {
  data: { user: { email: 'admin@gmail.com', password: ENV['MOCK_PASSWORD_USER'], role: 'admin' } },
};

export const responseUsers = [
  {
    email: 'admin@gmail.com',
    password: ENV['MOCK_PASSWORD_USER'],
    role: ENV['MOCK_ROLE_2'],
  },
  {
    email: 'user@gmail.com',
    password: ENV['MOCK_PASSWORD_USER'],
    role: ENV['MOCK_ROLE_3'],
  },
];

export const responseUserNotFound = '📡 Request: GET /api/v1/users | Status: 404';
