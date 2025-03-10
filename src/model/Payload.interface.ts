import { UserRole } from "../enum/UserRole.enum";

export interface Payload {
    id: string;
    email: string;
    role: UserRole;
  }