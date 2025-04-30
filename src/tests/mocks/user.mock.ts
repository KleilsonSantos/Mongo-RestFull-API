import '../../config/load-env';

const ENV = process.env;

export const userExample = {
  email: 'admin@gmail.com',
  password: ENV['MOCK_PASSWORD_USER'],
  role: 'user',
};
export const userAdmin = {
  email: 'admin@gmail.com',
  password: ENV['MOCK_PASSWORD_USER'],
  role: 'admin',
};

export const responseUser = {
  data: { user: { email: 'admin@gmail.com', password: ENV['MOCK_PASSWORD_USER'], role: 'admin' } },
};

export const responseUsers = [
  {
    email: 'admin@gmail.com',
    password: ENV['MOCK_PASSWORD_USER'],
    role: 'admin',
  },
  {
    email: 'moderator@gmail.com',
    password: ENV['MOCK_PASSWORD_USER'],
    role: 'moderator',
  },
];

// ✅ Request and response logs for retrieving users
export const responseAllUsers = '✅ Users found'; // Success fetching all users
export const responseUsersForbidden = '📡 Request: GET /api/v1/users | Status: 403'; // Access forbidden
export const responseUsersNotFound = '📡 Request: GET /api/v1/users | Status: 404'; // Users not found
export const responseUsersError = '📡 Request: GET /api/v1/users | Status: 500'; // Server error

// ✅ Response when fetching a user by ID
export const responseUserById = '✅ Getting User by id'; // Fetch success
export const responseUserByIdNotFound = '❌ User not found'; // ID not found
export const responseUserByIdError = '❌ Error getting user by id'; // Error during fetch

// ✅ Response for creating a user
export const responseUserAlreadyExists = '✅ User already exists'; // Duplicate user
export const responseCreateUserError = '❌ Error creating user'; // Error during creation

// ✅ Response messages for update and delete operations
export const responseUpdateUser = '✅ User updated'; // Update success
export const responseUpdateUserError = '❌ Error updating user by id'; // Update error
export const responseUpdateUserGlobalError = '❌ Error updating user'; // General update error

export const responseDeleteUser = '✅ User deleted'; // Delete success
export const responseDeleteUserError = '❌ Error deleting user'; // Delete error

// ✅ Validation feedback
export const responseUserValidationSuccess = '✅ Validation success'; // Input valid
export const responseUserValidationFailure = '❌ Validation error'; // Input invalid
export const responseUserMissingCredentials = '❌ Email and password are required'; // Missing fields

// ✅ Authentication feedback
export const responseLoginStarted = '🔑 Login started'; // Auth start
export const responseLoginError = '❌ Error logging in'; // Auth error

// ✅ Environment variable issues
export const responseJwtEnvMissing =
  '❌ JWT_SECRET or JWT_EXPIRES_IN not found in environment variables'; // Missing env vars

// ✅ Global error handler
export const responseGlobalError = '🔥 Global error handler'; // Catch-all for unhandled errors
