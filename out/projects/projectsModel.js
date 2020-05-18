"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModel = void 0;
var ProjectsModel = /** @class */ (function () {
    function ProjectsModel() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.url = '';
        this.groupMembers = [];
        this.posts = [];
    }
    ProjectsModel.fromObject = function (object) {
        var p = new ProjectsModel();
        p.name = object.name;
        p.description = object.description;
        p.url = object.url;
        if (object.groupMembers) {
            var tmp = object.groupMembers;
            tmp = tmp.substring(1, tmp.length - 1);
            p.groupMembers = tmp.split(",");
        }
        p.posts = object.posts;
        return p;
    };
    ProjectsModel.prototype.toObject = function () {
        return { name: this.name, description: this.description, url: this.url, groupMembers: this.groupMembers, posts: this.posts };
    };
    return ProjectsModel;
}());
exports.ProjectsModel = ProjectsModel;
//# sourceMappingURL=projectsModel.js.map