import { withIronSessionApiRoute } from 'iron-session/next';

import sessionOptions from '../../lib/session';
import fetcher from '../../lib/fetcher';
import constants from '../../lib/constants';

export default withIronSessionApiRoute(async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { body } = req;
      const { user } = req.session;
      const response = await fetcher(`${constants.BASE_URL}/histories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(error.statusCode || 500).json(error.data);
    }
  }
}, sessionOptions);
