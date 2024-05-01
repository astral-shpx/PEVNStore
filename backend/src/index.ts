import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Product } from './entities/Product';
import passport from 'passport';
import session from 'express-session';
import Stripe from 'stripe';
import cartRoutes from './routes/cartRoutes';
import productsRoutes from './routes/productsRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT!, 10) || 3001;
const session_secret = process.env.SESSION_SECRET!;
const stripe_secret = process.env.STRIPE_API_KEY!;

// TODO
// user reviews
// Stripe - integrate with db
// favourites through session
// Testing
// AdminJS
// remove logging
// frontend

const stripe = new Stripe(stripe_secret, {
  apiVersion: '2024-04-10'
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/cart', cartRoutes);
app.use('/products', productsRoutes);
app.use('/auth', authRoutes);

app.post('/create-payment-intent', async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur'
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message
      }
    });
  }
});

app.get('/', async (req: Request, res: Response) => {
  const productRepository = AppDataSource.getRepository(Product);

  // const product = new Product();
  // product.product_name = 'Me and Bears';
  // product.product_description = 'I am near polar bears';
  // await productRepository.save(product);
  // console.log('Product has been saved');

  const savedProducts = await productRepository.find();
  // console.log('All Products from the db: ', savedProducts);

  const user = req.user ? req.user : 'No user logged in';

  res.json({
    loggedUser: user,
    products: savedProducts
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
