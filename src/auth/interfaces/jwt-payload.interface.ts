export interface JwtPayload {
  sub: string;
  username: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}
