import express from "express";

export class Controller {
    public getHello(req: express.Request, res: express.Response): void {
        res.send("Hello World");
    }
    public postHello(req: express.Request, res: express.Response): void {
        res.send(req.body.name);
    }
    public getUsers(req: express.Request, res: express.Response): void {
        console.log(req.params.id);
    }
    public getUser(req: express.Request, res: express.Response): void {
        console.log(req.params.id);
    }
    public postUser(req: express.Request, res: express.Response): void {
        console.log(req.params.id);
    }
    public putUser(req: express.Request, res: express.Response): void {
        console.log(req.params.id);
    }
    public deleteUser(req: express.Request, res: express.Response): void {
        console.log("delete");
    }

}

// Resource:

// get; http: // localhost:3000/api/users (list of all users that I am allowed to see)

// get; http: // localhost:3000/api/users/id (get the user with id=id)

// post; http: // localhost:3000/api/users (add a new user based on the body of the request)

// put; http: // localhost:3000/api/users/id (update user with id=id using the body of the request)

// delete http; : // localhost:3000/api/users/id (delete the user with id=id)
