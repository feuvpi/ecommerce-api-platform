export interface JwtPayload {
  sub: string;
  username: string;
  password: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}
