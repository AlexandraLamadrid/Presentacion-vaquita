import Router from "express-promise-router"
import UserRouter from './users.router.js';
import AuthRouter from './auth.router.js';
import friendsRouter from './friends.router.js';
import groupRouter from '../routers/groups.router.js';
import { 
    connectDatabase, 
    commitDatabase, 
    rollbackDatabase 
} from "../lib/database.middleware.js";


const AsyncRouter = () => {
    const router = Router();

    router.use(connectDatabase);
    router.use("/groups", groupRouter());
    router.use("/friends", friendsRouter());
    router.use("/users", UserRouter());
    router.use("/auth", AuthRouter());
    router.use(commitDatabase);
    router.use(rollbackDatabase);

    return router;
}

export default AsyncRouter;