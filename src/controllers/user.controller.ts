import express from "express";
import StandardResponse from "../util/response/StandardResponse";
import UserDto from "dto/user.dto";
import jwt, { Secret } from "jsonwebtoken";

const UserModel = require("../model/User");

const existsByEmail = async (email: string): Promise<boolean> => {
    try {
        const user = await UserModel.findOne({ where: { email: email } });
        return !!user;
    } catch (error) {
        console.error('Error checking user existence:', error);
        return false;
    }
}


export const signin = async (req: express.Request, res: express.Response) => {
    async function generateToken() {
        return jwt.sign(
            { email: req.body.email },
            process.env.JWT_SECRET as Secret,
            { expiresIn: "2w" }
        );
    }

    try {
        let login_req = req.body;
        let user = await UserModel.findOne({ where: { email: login_req.email } });

        if (user) {
            console.log("user found");
            if (user.password == login_req.password) {
                console.log("user logged in successfully");
                let token = await generateToken();
                res.send(
                    new StandardResponse(200, "User logged in successfully", {
                        email: user.email,
                        token: token
                    })
                );
            } else {
                console.log("Invalid credentials");
                res.send(new StandardResponse(401, "Invalid credentials", null));
            }
        } else {
            res.send(new StandardResponse(404, "User not found", null));
        }
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .send(new StandardResponse(500, "Something went wrong", null));
    }
};

export const viewUser = async (req: express.Request, res: express.Response) => {
    const userdto: UserDto = req.body;
    try {
        const exists = await existsByEmail(userdto.email);
        if (exists) {
            UserModel.findOne({ where: { email: userdto.email } }).then((user: any) => {
                res.json(new StandardResponse(200, "User retrieved successfully", user));
            })
        }
        else {
            res.json(new StandardResponse(404, "User not found", null));
        }
    } catch {
        res.json(new StandardResponse(500, "Something went wrong", null));
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const userdto: UserDto = req.body;
    try {
        const exists = await existsByEmail(userdto.email);
        if (exists) {
            const user = await UserModel.findOne({ where: { email: userdto.email } });
            if (user) {
                await user.destroy();
                res.json(new StandardResponse(200, "User deleted successfully", null));
            } else {
                res.json(new StandardResponse(404, "User not found", null));
            }
        } else {
            res.json(new StandardResponse(404, "User not found", null));
        }
    } catch (error) {
        console.log("Error deleting user", error);
        res.json(new StandardResponse(500, "Something went wrong", null));
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    const userDto: UserDto = req.body;

    try {
        const user = await UserModel.findOne({ where: { email: userDto.email } });
        if (user) {
            user.name = userDto.name;
            user.password = userDto.password;
            user.mobile = userDto.mobile;
            user.email = userDto.email;
            await user.save();
            res.json(new StandardResponse(200, "User updated successfully", null));
        } else {
            res.json(new StandardResponse(404, "User not found", null));
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.json(new StandardResponse(500, "Something went wrong", null));
    }
}

export const get = async (req: express.Request, res: express.Response) => {
    res.json(new StandardResponse(200, "User retrieved successfully", null));
}

export const signup = async (req: express.Request, res: express.Response) => {
    try {
        const userdto: UserDto = req.body;
        console.log(userdto);
        const exists = await existsByEmail(userdto.email);

        if (exists) {
            return res
                .status(400)
                .send(new StandardResponse(400, "User already exists!", null));
        } else {
            const user = await UserModel.create(userdto);
            return res
                .status(201)
                .send(new StandardResponse(201, "User created successfully", user));
        }

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send(new StandardResponse(500, "Something went wrong!", null));
    }
};

export const getUsersList = async (req: express.Request, res: express.Response) => {
    try {
        const users = await UserModel.findAll();
        return res
            .status(200)
            .send(new StandardResponse(200, "Users retrieved successfully", users));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send(new StandardResponse(500, "Something went wrong!", null));
    }
}
