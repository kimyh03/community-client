export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("X-JWT")) || false
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("X-JWT", token);
      window.location.href = "http://localhost:3000/";
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("X-JWT");
      window.location.href = "http://localhost:3000/";
      cache.removeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    }
  }
};
