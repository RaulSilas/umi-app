import { User } from '@/types/user.d';
import { Request, Response } from 'express';

const user: { currentUser: User } = {
  currentUser: {
    isLoggedIn: false,
  },
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email == 'john@doe.com' && password == 'user') {
    user.currentUser = {
      id: 0,
      name: 'John Doe',
      company: 'Umi Group',
      role: {
        id: 1,
        title: 'Inside Sales',
      },
      isLoggedIn: true,
    };
  } else if (email == 'marry@doe.com' && password == 'admin') {
    user.currentUser = {
      id: 1,
      name: 'Marry Doe',
      company: 'Umi Group',
      role: {
        id: 0,
        title: 'Sales Manager',
      },
      isLoggedIn: true,
    };
  } else {
    res.status(401).send();
  }

  res.json(user.currentUser);
};

const logout = (_: any, res: Response) => {
  user.currentUser = { isLoggedIn: false };
  res.send({ success: true });
};

const getUser = (_: any, res: Response) => {
  if (!user.currentUser.isLoggedIn) {
    res.status(204).send();
  } else {
    res.json(user.currentUser);
  }
};

export default {
  'POST /api/login': login,
  'POST /api/logout': logout,
  '/api/currentUser': getUser,
};
