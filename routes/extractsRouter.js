import {Router} from "express";
import { addExtract, getExtract, deleteExtract} from "../controllers/extractsController.js";
import { getUser } from "../middleware/userMiddleware.js";
import registerExistValidate from "../middleware/RegisterexisteMiddleware.js";

const extractsRouter= Router();
/**Extractos */
extractsRouter.use(getUser);
extractsRouter.get("/extractos",getExtract);
extractsRouter.post("/extractos",addExtract);
extractsRouter.delete("/extractos/:id", registerExistValidate, deleteExtract);

/**Post/Extractos */
export default extractsRouter;