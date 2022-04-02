export const mapAuthResponse = (response) => ({
  isLoggedIn: true,
  accessToken: response?.body?.access_token,
});

export const isLoggedIn = (user) => !!user;

const auth = {
  mapAuthResponse,
  isLoggedIn,
};

export default auth;
