import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import passport from 'passport';
import argon2 from 'argon2';

const router = Router();

router.post('/login/password', (req, res, next) => {
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

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
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

router.post('/signup', async (req, res, next) => {
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

export default router;
