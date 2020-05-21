import express, { RequestHandler } from 'express';
import { ProjectsModel } from './projectsModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';
//This is just an example of a second controller attached to the security module

export class ProjectsController {
    static db: Database = new Database(Config.url, "projects");
    static projectsTable = 'projects';

    //getApprovedProjects
    //sends a json object with all projects in the system
    getApprovedProjects(req: express.Request, res: express.Response) {
        ProjectsController.db.getRecords(ProjectsController.projectsTable, {'state':'approved'})
        .then(results => {
            results.map((x: any) => 
                {delete x.applicant;
                delete x.approvedBy;
                delete x.dateSubmitted;
                delete x.dateUpdated;
                delete x.posts;});
            res.send({ fn: 'getApprovedProjects', status: 'success', data: { projects: results } });
        })
        .catch((reason) => res.status(500).send(reason).end());
    }
    //getSubmittedProjects
    //sends a json object with all projects in the system
    getSubmittedProjects(req: express.Request, res: express.Response) {
        ProjectsController.db.getRecords(ProjectsController.projectsTable, {'applicant':req.body.authUser.email})
        .then(results => {
            res.send({ fn: 'getSubmittedProjects', status: 'success', data: { projects: results } });
        })
        .catch((reason) => res.status(500).send(reason).end());
    }
    //getProjectsByCurUser
    //sends the specific project as JSON with current user as groupmember
    getProjectsByCurUser(req: express.Request, res: express.Response) {
        const user = req.body.authUser;
        ProjectsController.db.getRecords(ProjectsController.projectsTable, {'state':'approved','groupMembers':{$in:[user.email]}})
            .then((results) => {
                results.map((x: any) => 
                {delete x.applicant;
                delete x.approvedBy;
                delete x.dateSubmitted;
                delete x.dateUpdated;});
                res.send({ fn: 'getProjectsByCurUser', status: 'success', data: results }).end()})
            .catch((reason) => res.status(500).send(reason).end());
    }
    //getProjectsById
    //sends the specific project as JSON with id=:id
    // getProjectsById(req: express.Request, res: express.Response) {
    //     const id = Database.stringToId(req.params.id);
    //     ProjectsController.db.getRecords(ProjectsController.projectsTable, {_id: id})
    //         .then((results) => res.send({ fn: 'getProjectsByCurUser', status: 'success', data: results }).end())
    //         .catch((reason) => res.status(500).send(reason).end());
    // }
    //addProject
    //adds the project to the database, set state to pending
    addProject(req: express.Request, res: express.Response) {
        const proj: ProjectsModel = ProjectsModel.fromObject(req.body);
        proj.posts=[];
        proj.state='pending';
        proj.applicant=req.body.authUser.email;
        proj.dateSubmitted=Date.now().toString();
        proj.dateUpdated=proj.dateSubmitted;
        ProjectsController.db.addRecord(ProjectsController.projectsTable, proj.toObject())
            .then((result: boolean) => res.send({ fn: 'addProject', status: 'success' }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    //updateProject
    //updates the project in the database with id :id
    updateProject(req: express.Request, res: express.Response) {
        if (req.body.authUser.isAdmin !== 'True'){
            res.send({ fn: 'updateProject', status: 'failure', data: 'User is not Administrator' });
        }
        else{
            const id = Database.stringToId(req.body.id);
            ProjectsController.db.getOneRecord(ProjectsController.projectsTable, {'_id':id})
                .then((result) => {
                    if(result.state != 'approved'){
                        res.send({ fn: 'updateProject', status: 'failure', data: 'state must be "approved"' });
                    }
                    else{
                        const data = req.body;
                        data.dateUpdated=Date.now().toString();
                        delete data.authUser;
                        delete data.id;
                        ProjectsController.db.updateRecord(ProjectsController.projectsTable, { _id: id }, { $set: req.body })
                            .then((results) => results ? (res.send({ fn: 'updateProject', status: 'success' })) : (res.send({ fn: 'updateProject', status: 'failure', data: 'Not found' })).end())
                            .catch(err => res.send({ fn: 'updateProject', status: 'failure', data: err }).end());
                    }
                }).catch(err => res.send({ fn: 'updateProject', status: 'failure', data: err }).end());
        }
    }
    //deleteProject
    //deletes the project int he database with id :id
    deleteProject(req: express.Request, res: express.Response) {
        if (req.body.authUser.isAdmin !== 'True'){
            res.send({ fn: 'deleteProject', status: 'failure', data: 'User is not Administrator' });
        }
        else{
            const id = Database.stringToId(req.body.id);
            ProjectsController.db.getOneRecord(ProjectsController.projectsTable, {'_id':id})
            .then((result) => {
                if(result.state != 'approved'){
                    res.send({ fn: 'deleteProject', status: 'failure', data: 'state must be "approved"' });
                }
                else{
                    const data = req.body;
                    data.dateUpdated=Date.now().toString();
                    delete data.authUser;
                    delete data.id;
                    ProjectsController.db.updateRecord(ProjectsController.projectsTable, { _id: id }, { $set:{'state':'deleted','dateUpdated':Date.now().toString()}})
                    .then((results) => results ? (res.send({ fn: 'deleteProject', status: 'success' })) : (res.send({ fn: 'deleteProject', status: 'failure', data: 'Not found' })).end())
                    .catch(err => res.send({ fn: 'deleteProject', status: 'failure', data: err }).end());
                }
            }).catch(err => res.send({ fn: 'deleteProject', status: 'failure', data: err }).end());
        }
    }
    //getAllProjects
    //checks if current user is admin, if True then returns all projects
    getAllProjects(req: express.Request, res: express.Response) {
        if (req.body.authUser.isAdmin !== 'True'){
            res.send({ fn: 'getAllProjects', status: 'failure', data: 'User is not Administrator' });
        }
        else{
            ProjectsController.db.getRecords(ProjectsController.projectsTable, {})
            .then(results => {
                res.send({ fn: 'getAllProjects', status: 'success', data: { projects: results } });
            })
            .catch((reason) => res.status(500).send(reason).end());
        }
    }
    //getSemesters
    //returns all valid unique semesters in the database
    // getSemesters(req: express.Request, res: express.Response) {
    //     ProjectsController.db.getRecords(ProjectsController.projectsTable)
    //         .then(results => {
    //             //extracts just the semester
    //             let semesters = results.map((x: any) => x.semester);
    //             //removes duplciates
    //             semesters = semesters.filter((value: string, index: number, array: any[]) =>
    //                 !array.filter((v, i) => value === v && i < index).length);
    //             res.send({ fn: 'getSemesters', status: 'success', data: { semesters: semesters } })
    //         })
    //         .catch((reason) => res.status(500).send(reason).end());
    // }
    //getProjectNumbers
    //returns all valid unique projectNumbers for a given semesters in the database
    // getProjectNumbers(req: express.Request, res: express.Response) {
    //     const semester = req.params.semester;
    //     ProjectsController.db.getRecords(ProjectsController.projectsTable,{semester:semester})
    //         .then(results => {
    //             //extracts just the projectNumber
    //             let projects = results.map((x: any) => x.projectNumber);
    //             //removes duplciates
    //             projects = projects.filter((value: number, index: number, array: any[]) =>
    //                 !array.filter((v, i) => value === v && i < index).length);
    //             res.send({ fn: 'getProjectNumbers', status: 'success', data: { projectNumbers:projects.sort()} });
    //         })
    //         .catch((reason) => res.status(500).send(reason).end());
    // }

}