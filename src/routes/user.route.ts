import express from "express";
import * as UserController from "../controllers/user.controller";
import verityToken from "../util/middleware/VerifyToken";
const router = express.Router();


router.get('/', UserController.get)

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

router.get('/view', verityToken, UserController.viewUser);
router.delete('/delete', verityToken, UserController.deleteUser);
router.get('/getAll', UserController.getUsersList);

router.patch('/update', UserController.updateUser);

export default router;