const usersController = require("../controllers/users")

module.exports = (router) => {
    router.get('/user', usersController.getUser);
    router.get('/users', usersController.getUsers);
};
