import {Response, NextFunction } from 'express';

export default function isLoggedIn(req: any, res: Response, next: NextFunction) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the page
    res.redirect('/user/login');
}
