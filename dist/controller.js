"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    getHello(req, res) {
        res.send("Hello World");
    }
    postHello(req, res) {
        res.send(req.body.name);
    }
    getUsers(req, res) {
        console.log(req.params.id);
    }
    getUser(req, res) {
        console.log(req.params.id);
    }
    postUser(req, res) {
        console.log(req.params.id);
    }
    putUser(req, res) {
        console.log(req.params.id);
    }
    deleteUser(req, res) {
        console.log("delete");
    }
}
exports.Controller = Controller;
// Resource:
// get; http: // localhost:3000/api/users (list of all users that I am allowed to see)
// get; http: // localhost:3000/api/users/id (get the user with id=id)
// post; http: // localhost:3000/api/users (add a new user based on the body of the request)
// put; http: // localhost:3000/api/users/id (update user with id=id using the body of the request)
// delete http; : // localhost:3000/api/users/id (delete the user with id=id)
//# sourceMappingURL=controller.js.map