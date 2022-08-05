import {Request , Response} from "express";

export default (req: Request, res: Response) => {
    res.status(404);
    const content = '404 | not found';
    res.send(content);
};