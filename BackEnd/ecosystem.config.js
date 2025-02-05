module.exports = {
    apps: [

      {
        name: "LogoutService",
        script: "Domains/Auth/Logout/server.js",
      },
      {
        name: "ValidationService",
        script: "Domains/Auth/Validation/server.js",
      },
      {
        name: "RegisterService",
        script: "Domains/Users/Register/server.js",
      }
    ]
  };
  