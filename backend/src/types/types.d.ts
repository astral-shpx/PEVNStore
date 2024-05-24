import 'express-session';
import { Request } from 'express';

interface CartItem {
  product_id: number;
  quantity: number;
  user?: number;
}

declare module 'express-session' {
  export interface SessionData {
    cart: Array<CartItem>;
  }
}

declare global {
  namespace Express {
    interface Request {
      frontendBaseUrl?: string;
    }
  }
}
