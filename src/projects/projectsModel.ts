
export class ProjectsModel{
    id='';
    name='';
    description?='';
    url='';
    groupMembers:string[]=[];
    posts:string[]=[];

    public constructor(){
    }

    static fromObject(object:any):ProjectsModel{
        const p:ProjectsModel=new ProjectsModel();
        p.name=object.name;
        p.description=object.description;
        p.url=object.url;
        p.groupMembers=object.groupMembers;
        p.posts=object.posts;
        return p;
    }
    toObject():any{
        return {name:this.name,description:this.description,url:this.url,groupMembers:this.groupMembers,posts:this.posts};
    }
}