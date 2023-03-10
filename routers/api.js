
const express = require('express');
const authController = require("../controllers/auth.controller");
const ticketController = require("../controllers/ticket.controller");
const userController = require("../controllers/user.controller");
const validator = require("../middlewares/validators");
const {authenticate, authorize, authorizeRoles} = require("../middlewares/auth");

const apiRouter = express.Router();
const apiRouterSecure = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({
        message: 'You have reached the API service successfully!'
    });
});

apiRouter.route("/register").post(validator.authRegister,authController.register);
apiRouter.route("/login").post(validator.authLogin,authController.login);
apiRouter.route("/logout").post(authController.logout);
apiRouter.route("/refresh").post(validator.authRefresh, authController.refresh);

apiRouterSecure.use(authenticate);

apiRouterSecure.route("/users")
.get(authorize,userController.index)
.post(authorize, validator.userCreate,userController.create);

apiRouterSecure.route("users/:id")
.get(authorize, userController.read)
.put(authorize, validator.userUpdate,userController.update)
.delete(authorize,userController.destroy);

apiRouterSecure.route("/tickets")
.get(authorizeRoles(['admin','customer']), ticketController.index)
.post(authorizeRoles(['admin','customer']), ticketController.create);

apiRouterSecure.route("/tickets/:id")
.get(authorizeRoles(['admin','customer']), ticketController.read)
.put(authorizeRoles(['customer']), ticketController.update)
.delete(authorize, ticketController.destroy);

apiRouterSecure.route("/orders/:id/set-status").patch(authorize,ticketController.setStatus);


module.exports = {
    apiRouter: apiRouter, 
    apiRouterSecure: apiRouterSecure
};