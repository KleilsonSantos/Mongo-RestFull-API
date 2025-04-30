import { disconnect } from '../../config/db';

export default async () => {
  console.log('🛑 Disconnecting database and cleaning up after tests...');
  await disconnect();
};
