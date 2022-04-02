import { Typography } from 'antd';
import { withIronSessionSsr } from 'iron-session/next';

import sessionOptions from '../lib/session';

function Logout() {
  return <Typography.Text>Logging out...</Typography.Text>;
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  req.session.destroy();

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}, sessionOptions);

export default Logout;
