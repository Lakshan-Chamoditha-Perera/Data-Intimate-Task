import express from "express";
import StandardResponse from "../response/StandardResponse";


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



