import { Router, Request, Response } from 'express';
import { CartItem } from '../types/types';

const router = Router();

const checkAuth = (req: Request, res: Response, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};

router.use(checkAuth);

router.get('/', (req: Request, res: Response) => {
  const cart: CartItem[] = req.session.cart || [];
  return res.json(cart);
});

router.put('/', (req: Request, res: Response) => {
  const { product_id, quantity }: CartItem = req.body;

  if (!product_id || !quantity) {
    return res.status(400).send({ message: 'Product id or quantity missing' });
  }

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const itemIndex = req.session.cart.findIndex(
    item => item.product_id === product_id
  );

  if (itemIndex !== -1) {
    req.session.cart[itemIndex].quantity = quantity;
    return res
      .status(200)
      .send({ message: 'Item quantity updated', product_id, quantity });
  } else {
    return res
      .status(406)
      .send({ message: 'Item is not in cart', product_id, quantity });
  }
});

router.post('/', (req: Request, res: Response) => {
  const { product_id, quantity }: CartItem = req.body;
  const newItem: CartItem = { product_id, quantity };

  if (!req.session.cart) {
    req.session.cart = [];
  }

  if (!product_id || !quantity) {
    return res.status(400).send({ message: 'Product id or quantity missing' });
  }
  console.log(newItem);
  if (isNaN(newItem.product_id) || isNaN(newItem.quantity)) {
    return res.status(400).send({
      message: 'Product id or quantity is not a number',
      product_id,
      quantity
    });
  }

  if (req.session.cart?.some(item => item.product_id === product_id)) {
    return res
      .status(400)
      .send({ message: 'Cannot add duplicate item', product_id });
  }

  req.session.cart.push(newItem);
  return res.status(201).send({ message: 'Item added to cart', product_id });
});

router.delete('/', (req: Request, res: Response) => {
  const { product_id }: CartItem = req.body;

  if (!product_id) {
    return res.status(400).send({ message: 'Product id missing' });
  }

  if (!req.session.cart) {
    return res.status(404).send({ message: 'Cart not found' });
  }

  const newCart = req.session.cart.filter(
    (item: CartItem) => item.product_id !== product_id
  );

  if (newCart.length !== req.session.cart.length) {
    req.session.cart = newCart;
    return res
      .status(200)
      .send({ message: 'Item removed from cart', product_id });
  } else {
    return res.status(406).send({ message: 'Item is not in cart', product_id });
  }
});

export default router;
