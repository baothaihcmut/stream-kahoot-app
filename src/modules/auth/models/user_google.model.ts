export const USER_GOOGLE_CONTEXT = Symbol('user-google-context');
export interface UserGoogle {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}
