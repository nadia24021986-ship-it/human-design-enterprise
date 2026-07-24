export type UserRole = 'master' | 'user';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole;
  isActive: boolean;
}

export interface AuthActionResult {
  success: boolean;
  message: string;
}
