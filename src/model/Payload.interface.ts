import { UserRole } from '../enum/user-role.enum';

export interface Payload {
  id: string;
  email: string;
  role: UserRole;
}
