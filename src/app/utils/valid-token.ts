
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../interfaces/jwt/jwt-payload';

export default class isTokenValid {

  static isValid(token: string | null): boolean {
    if (!token) {
      return false
    }
    try {
      const payload: JwtPayload = jwtDecode<JwtPayload>(token)
      const expiry = payload.exp
      const now = Math.floor(Date.now() / 1000)
      return expiry ? expiry > now : false
    } catch (error) {
      return false
    }
  }
}
