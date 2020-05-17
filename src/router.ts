import express from "express";
import { Controller } from "./controller";

export class ApiRouter {
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {
        this.router.get("/hello", this.controller.getHello);
        this.router.post("/hello", this.controller.postHello);
        this.router.get("/users", this.controller.getUsers);
        this.router.get("/users/:id", this.controller.getUser);
        this.router.post("/users", this.controller.postUser);
        this.router.put("/users/:id", this.controller.putUser);
        this.router.delete("/users/:id", this.controller.deleteUser);

        // this.router.get("/appointment/:id")
        return this.router;
    }
}
