import express from "express";
import * as UserController from "../controllers/user.controller";
const router = express.Router();

router.get('/', UserController.get)

router.post('/signup',UserController.signup); 
router.post('/signin',UserController.signin);  

router.get('/view',UserController.viewUser);
router.delete('/delete',UserController.deleteUser);  
router.patch('/update',UserController.updateUser);

export default router;