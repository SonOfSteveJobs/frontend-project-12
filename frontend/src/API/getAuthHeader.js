const getAuthHeader = () => {
  const userToken = JSON.parse(localStorage.getItem('userToken'));
  return userToken && userToken.token ? { Authorization: `Bearer ${userToken.token}` } : {};
};

export default getAuthHeader;
