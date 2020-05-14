const generateMessage = (username, text) => {
  return {
    text,
    username,
    createdAt: Date.now(),
  };
};

const generateUrl = (username, url) => {
  return {
    url,
    username,
    createdAt: Date.now(),
  };
};

module.exports = {
  generateMessage,
  generateUrl,
};
