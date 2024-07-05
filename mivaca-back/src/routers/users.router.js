import Router from "express-promise-router";
import Controller from "../controllers/users.controller.js";
import continuator from "../lib/continue.decorator.js";

const createUserRouter = () => {

    const router = Router();
    const controller = Controller();

    router.get('/:id', continuator(controller.getById));
    router.get('/notingroup/:groupId', continuator(controller.getUsersNotInGroup));
    router.post('/', continuator(controller.create));

    return router;
    
};

export default createUserRouter;