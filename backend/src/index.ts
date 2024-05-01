import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Product } from './entities/Product';
import { User } from './entities/User';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import argon2 from 'argon2';
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
const google_client_id = process.env.GOOGLE_CLIENT_ID!;
const google_secret = process.env.GOOGLE_CLIENT_SECRET!;

// TODO
// google oauth2.0
// user reviews
// Stripe - integrate with db
// favourites through session
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
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/cart', cartRoutes);
app.use('/products', productsRoutes);
app.use('/auth', authRoutes);

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

passport.use(
  new GoogleStrategy(
    {
      clientID: google_client_id,
      clientSecret: google_secret,
      callbackURL: 'http://localhost:3001/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('GOOGLE profile: ', profile);
        const userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOne({
          where: { googleId: profile.id }
        });
        console.log('GOOGLE USER: ', user);

        if (user) {
          return done(null, user);
        }

        // If user is new via Google, save them in the DB
        user = new User();
        user.googleId = profile.id;
        user.email = profile.emails?.[0].value;
        user.displayName = profile.displayName;
        await userRepository.save(user);

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    done(null, user);
  } catch (error) {
    done(error, null);
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
