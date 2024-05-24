import Stripe from 'stripe';
import { Router, Request, Response } from 'express';

import dotenv from 'dotenv';
dotenv.config();

const router = Router();
const stripe_secret = process.env.STRIPE_API_KEY!;
const stripe = new Stripe(stripe_secret, {
  apiVersion: '2024-04-10'
});

router.use((req: Request, res: Response, next: any) => {
  res.setHeader(
    'Content-Security-Policy',
    "connect-src 'self' https://checkout.stripe.com; " +
      "frame-src 'self' https://checkout.stripe.com; " +
      "script-src 'self' https://checkout.stripe.com; " +
      "img-src 'self' https://*.stripe.com"
  );
  return next();
});

router.use((req: Request, res: Response, next: any) => {
  const fullUrl = req.get('referer');
  if (fullUrl) {
    const { origin } = new URL(fullUrl);
    req.frontendBaseUrl = origin;
  } else {
    req.frontendBaseUrl = '';
  }
  return next();
});

router.post('/test', async (req: Request, res: Response) => {
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

router.get('/successful-payment', async (req: Request, res: Response) => {
  return res.json({ message: 'successful payment' });
});

router.post('/create-checkout-session', async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'test'
          },
          unit_amount: 100
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${req.frontendBaseUrl}/successful-payment`,
    cancel_url: `${req.get('referer')}`
  });

  return res.status(303).redirect(session.url!);
});

export default router;
