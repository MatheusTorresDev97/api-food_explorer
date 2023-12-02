const AppError = require("../utils/AppError");

class UsersControllers {
    async create(request, response) {
      const { name, email, password } = request.body;

      if (!email) {
        throw new AppError("Email não foi informado!");
      }
      
      return response.status(201).json();
    }
  }
  
  module.exports = UsersControllers;