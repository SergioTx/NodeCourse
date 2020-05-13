const generateMessage = (text) => {
  return {
    text,
    createdAt: Date.now(),
  };
};

const generateUrl = (url) => {
  return {
    url,
    createdAt: Date.now(),
  };
};

module.exports = {
  generateMessage,
  generateUrl,
};
