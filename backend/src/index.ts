import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Product } from './entities/Product';
import { User } from './entities/User';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import argon2 from 'argon2';
import session from 'express-session';
import Stripe from 'stripe';
import cartRoutes from './routes/cartRoutes';
import productsRoutes from './routes/productsRoutes';

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT!, 10) || 3001;
const session_secret = process.env.SESSION_SECRET!;
const stripe_secret = process.env.STRIPE_API_KEY!;

// TODO
// product pagination with page number and offset params
// favourites through session
// user reviews
// Stripe - integrate with db
// Testing
// AdminJS
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
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/cart', cartRoutes);
app.use('/products', productsRoutes);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { username: username }
      });

      if (!user) {
        // console.log('User found: ', user);
        return done(null, false, {
          message: 'Incorrect username or password.'
        });
      }

      const isValid = await argon2.verify(user.password_hash, password);
      // console.log('isValid is ', isValid);
      if (!isValid) {
        return done(null, false, {
          message: 'Incorrect username or password.'
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user: User, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user: User, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

app.post('/login/password', (req, res, next) => {
  passport.authenticate('local', (err: any, user: User, info: any) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Login failed' });
    }
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in' });
      }
      return res.status(200).json({
        message: 'Login successful',
        user: { id: user.id, username: user.username }
      });
    });
    return res.status(404);
  })(req, res, next);
});

app.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    // res.redirect('/');
    return res.status(200).json({
      message: 'Logout successful'
    });
  });
});

app.post('/signup', async (req, res, next) => {
  try {
    // console.log(req.body);
    const hashedPassword = await argon2.hash(req.body.password, {
      timeCost: 3,
      memoryCost: 1024 * 64
    });

    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({
      username: req.body.username,
      password_hash: hashedPassword
    });

    const savedUser = await userRepository.save(newUser);

    req.login(savedUser, err => {
      if (err) {
        return next(err);
      }
      // res.redirect('/');
      return res.status(200).json({
        message: 'Signup successful',
        user: { id: savedUser.id, username: savedUser.username }
      });
    });
  } catch (err) {
    next(err);
  }
});

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
