import 'express-session';

interface CartItem {
  product_id: number;
  quantity: number;
}

declare module 'express-session' {
  export interface SessionData {
    cart: Array<CartItem>;
  }
}
