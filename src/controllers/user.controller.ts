import express from "express";
import StandardResponse from "../response/StandardResponse";
import UserDto from "dto/user.dto";

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


export const saveUser = async (req: express.Request, res: express.Response) => {
    // console.log(req.body);
    res.json(new StandardResponse(200, "User saved successfully", null));
}

export const viewUser = async (req: express.Request, res: express.Response) => {
    res.json(new StandardResponse(200, "User viewed successfully", null));
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    res.json(new StandardResponse(200, "User deleted successfully", null));
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    res.json(new StandardResponse(200, "User updated successfully", null));
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



