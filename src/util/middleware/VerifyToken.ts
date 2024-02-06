import express from "express";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";

const verifyToken = (req: express.Request, res: any, next: express.NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json('empty token')
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET as Secret);
        res.tokenData = data;
        next();
    } catch (error) {
        return res.status(401).json('invalid token')
    }
}
export default verifyToken;