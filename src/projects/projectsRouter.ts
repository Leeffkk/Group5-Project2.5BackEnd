import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { ProjectsController } from "./projectsController";

//This is just an example second router to show how additional routers can be added
export class ProjectsRouter extends AppRouter{
    static projController: ProjectsController=new ProjectsController();
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {      
        this.expressRouter.get('/getProjects',ProjectsRouter.projController.getProjects);
        this.expressRouter.get('/getProjectsByCurUser',[SecurityMiddleware.RequireAuth],ProjectsRouter.projController.getProjectsByCurUser);
        // this.expressRouter.get('/getProjectsById',[SecurityMiddleware.RequireAuth],ProjectsRouter.projController.getProjectsById);
        this.expressRouter.post('/',[SecurityMiddleware.RequireAuth],ProjectsRouter.projController.addProject);
        this.expressRouter.put('/',[SecurityMiddleware.RequireAuth],ProjectsRouter.projController.updateProject);
        this.expressRouter.delete('/:id',[SecurityMiddleware.RequireAuth],ProjectsRouter.projController.deleteProject);
    }    
}