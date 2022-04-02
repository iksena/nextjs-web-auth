import { withIronSessionApiRoute } from 'iron-session/next';

import sessionOptions from '../../lib/session';
import fetcher from '../../lib/fetcher';
import constants from '../../lib/constants';

export default withIronSessionApiRoute(async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { body } = req;
      const path = body.email ? 'register' : 'login';
      const user = await fetcher(`${constants.BASE_URL}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      req.session.user = { ...user, isLoggedIn: true };
      await req.session.save();

      res.json(req.session.user);
    } catch (error) {
      console.log(error);
      res.status(error.statusCode || 500).json(error.data);
    }
  }
}, sessionOptions);
