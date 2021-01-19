const Endpoints = {
  auth: {
    signup: "/v1/auth/signup", // ? POST
    login: "/v1/auth/login", // ? POST
    activation: "/v1/auth/activation/:activationCode", // ? POST
    lostPasswordEmail: "/v1/auth/lost-password-mail", // ? POST
    passwordReset: "/v1/auth/password-reset", // ? POST
    newAccessToken: "/v1/auth/token", // ? POST
    logout: "/v1/auth/logout", // ? DELETE
    token: "/v1/auth/token", // ? POST
  },
  user: {
    profile: "/v1/app/user/info", // ? GET
    editProfile: "/v1/app/user/edit", // ? GET
    disableAccount: "v1/app/user/disable", // ? DELETE
    getAll: "v1/admin/user/info/all", // ? GET
    getById: "v1/admin/user/info/:id", // ? GET
    editByAdmin: "v1/admin/user/edit" // ? PUT
  },
  debug: {
    status: "/v1/debug/status/:status", // ? GET
  },
  feedback: {
    sendNew: "/v1/app/feedback/create", // ? POST
    getAll: "/v1/admin/feedback/all", // ? GET
    deleteById: "/v1/admin/feedback/delete/:id", // ? DELETE
    editById: "/v1/admin/feedback/edit", // ? PUT

  },
  pushNotification: {
    sendToken: "/v1/app/pushNotification/:token" // ? POST
  },
  logs: {
    getAll: "/v1/admin/logs/" // ? GET
  }
};

export default Endpoints;
