import {Router} from "express";
import { signin, signup,logOut } from "../controllers/authController.js";
import { validateSignIn,validateSignUp } from "../middleware/authMiddleware.js";
const authRouter = Router();


//<-----Fluxo Login----->//
/*Post/cadastro */

authRouter.post("/signup",validateSignUp,signup);
/*Post/Login */
authRouter.post("/signin",validateSignIn,signin);
authRouter.post("/logout", logOut);

export default authRouter;