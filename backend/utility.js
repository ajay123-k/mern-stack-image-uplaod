const somethingWentWrong = () => {
  return {
    status: {
      code: -1,
      message: "Something went wrong ! Try again",
    },
  };
};

const tokenExpired = () => {
  return {
    status: {
      code: -1,
      message: "Unauthorized request",
    },
  };
};

const userExist = () => {
  return {
    status: {
      code: -1,
      message: "User already exists !",
    },
  };
};

const userNotFound = () => {
  return {
    status: {
      code: -1,
      message: "User details not found !",
    },
  };
};

const incorrectPwd = () => {
  return {
    status: {
      code: -1,
      message: "Incorrect Password !",
    },
  };
};

module.exports = {
  somethingWentWrong,
  incorrectPwd,
  userExist,
  userNotFound,
  tokenExpired,
};
