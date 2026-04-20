import { jwtPayloadSchema } from '../model/jwt.schema';

export function decodePayload(token: string) {
  try {
    const base64 = token.split('.')[1];
    const decoded = JSON.parse(
      atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
    );
    return jwtPayloadSchema.parse(decoded);
  } catch {
    return null;
  }
}
