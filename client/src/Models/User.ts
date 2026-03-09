export interface UserProfile {
  userName: string;
  email: string;
}

export interface UserProfileToken extends UserProfile {
  token: string;
}