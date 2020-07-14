export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("X-JWT")) || false
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      if (token) {
        localStorage.setItem("X-JWT", token);
        cache.writeData({
          data: {
            isLoggedIn: true
          }
        });
      } else {
        throw new Error(" 아이디 혹은 비밀번호가 일치하지 않습니다.");
      }
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
