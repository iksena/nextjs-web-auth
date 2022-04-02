import constants from './constants';

const sessionOptions = {
  password: constants.SESSION_PASSWORD,
  cookieName: 'nextjs-registration',
  cookieOptions: {
    secure: false,
  },
};

export default sessionOptions;
