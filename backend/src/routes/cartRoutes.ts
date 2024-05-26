import { Router, Request, Response } from 'express';
import { CartItem } from '../types/types';
import { CartProduct } from '../entities/CartProduct';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

const router = Router();

router.use(async (req: Request, res: Response, next: Function) => {
  if (req.isAuthenticated()) {
    const cartRepository = AppDataSource.getRepository(CartProduct);

    let cartItems: CartItem[] = [];

    const cartDb = await cartRepository.find({
      where: { user: req.user },
      relations: ['product']
    });

    cartDb.forEach(item => {
      cartItems.push({
        product_id: item.product.id,
        quantity: item.quantity
      });
    });

    req.session.cart = cartItems;
  }
  return next();
});

router.get('/', async (req: Request, res: Response) => {
  const cart: CartItem[] = req.session.cart || [];
  return res.json(cart);
});

router.put('/', async (req: Request, res: Response) => {
  const { product_id, quantity }: CartItem = req.body;
  const cartRepository = AppDataSource.getRepository(CartProduct);

  if (!req.session.cart) {
    req.session.cart = [];
  }

  if (!product_id || !quantity) {
    return res.status(400).send({ message: 'Product id or quantity missing' });
  }

  if (isNaN(product_id) || isNaN(quantity)) {
    return res.status(400).send({
      message: 'Product id or quantity is not a number',
      product_id,
      quantity
    });
  }

  let cartProductExists = false;
  if (req.isAuthenticated()) {
    cartProductExists = await cartRepository.existsBy({
      user: req.user,
      product: { id: product_id }
    });
  }

  if (
    !req.session.cart.find(el => el.product_id === product_id) &&
    !cartProductExists
  ) {
    return res.status(406).send({ message: 'Item is not in cart', product_id });
  }

  if (req.isAuthenticated()) {
    cartRepository.update(
      { product: { id: product_id }, user: req.user },
      { quantity: quantity }
    );
  }

  const itemIndex = req.session.cart.findIndex(
    item => item.product_id === product_id
  );

  if (itemIndex !== -1) {
    req.session.cart[itemIndex].quantity = quantity;
  }

  return res
    .status(200)
    .send({ message: 'Item quantity updated', product_id, quantity });
});

router.post('/', async (req: Request, res: Response) => {
  const { product_id, quantity }: CartItem = req.body;
  const productRepository = AppDataSource.getRepository(Product);
  const cartRepository = AppDataSource.getRepository(CartProduct);

  if (!req.session.cart) {
    req.session.cart = [];
  }

  if (!product_id || !quantity) {
    return res.status(400).send({ message: 'Product id or quantity missing' });
  }

  if (isNaN(product_id) || isNaN(quantity)) {
    return res.status(400).send({
      message: 'Product id or quantity is not a number',
      product_id,
      quantity
    });
  }

  const productExists = await productRepository.existsBy({ id: product_id });
  if (!productExists) {
    return res
      .status(400)
      .send({ message: 'Product with id doesnt exist', product_id });
  }

  let cartProductExists = false;
  if (req.isAuthenticated()) {
    cartProductExists = await cartRepository.existsBy({
      user: req.user,
      product: { id: product_id }
    });
  }

  if (
    req.session.cart.find(el => el.product_id === product_id) ||
    cartProductExists
  ) {
    return res
      .status(400)
      .send({ message: 'Cannot add duplicate item', product_id });
  }

  const newItem: CartItem = { product_id, quantity };

  if (req.isAuthenticated()) {
    await cartRepository.save({
      product: { id: newItem.product_id },
      quantity: newItem.quantity,
      user: req.user
    });
  }

  req.session.cart.push(newItem);

  return res.status(201).send({ message: 'Item added to cart', product_id });
});

router.delete('/', async (req: Request, res: Response) => {
  const { product_id }: CartItem = req.body;

  const cartRepository = AppDataSource.getRepository(CartProduct);

  if (!product_id) {
    return res.status(400).send({ message: 'Product id missing' });
  }

  if (!req.session.cart) {
    return res.status(404).send({ message: 'Cart not found' });
  }

  let cartProductExists = false;
  if (req.isAuthenticated()) {
    cartProductExists = await cartRepository.existsBy({
      user: req.user,
      product: { id: product_id }
    });
  }

  if (
    !req.session.cart.find(el => el.product_id === product_id) &&
    !cartProductExists
  ) {
    return res.status(406).send({ message: 'Item is not in cart', product_id });
  }

  const newCart = req.session.cart.filter(
    (item: CartItem) => item.product_id !== product_id
  );

  if (req.isAuthenticated()) {
    await cartRepository.delete({
      user: req.user,
      product: { id: product_id }
    });
  }

  req.session.cart = newCart;

  return res
    .status(200)
    .send({ message: 'Item removed from cart', product_id });
});

// clear cart
router.delete('/clear', async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const cartRepository = AppDataSource.getRepository(CartProduct);
    await cartRepository.delete({ user: req.user });
  }

  req.session.cart = [];

  return res.status(200).send({ message: 'Cart cleared' });
});

export default router;
