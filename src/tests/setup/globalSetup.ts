import { connect } from '../../config/db';

export default async () => {
  console.log('✅ Connecting to database for tests...');
  await connect();
};
