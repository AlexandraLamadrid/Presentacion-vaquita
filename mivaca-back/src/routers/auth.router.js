import Router from "express-promise-router";
import Controller from "../controllers/users.controller.js";
import continuator from "../lib/continue.decorator.js";

const createUserRouter = () => {

    const router = Router();
    const controller = Controller();

    router.post('/login', continuator(controller.login));

    return router;
    
};

export default createUserRouter;