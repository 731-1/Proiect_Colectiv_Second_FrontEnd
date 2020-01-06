import {Component, OnInit} from '@angular/core';
import {BackendService} from '../core/backend/backend.service';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {ProjectService} from '../services/project.service';
import {Project} from '../models/project.model';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private backendService: BackendService, private toastrService: ToastrService,
              private projectService: ProjectService, private cookieService: CookieService) {
  }

  projectsArray: Project[];
  cols: any[];
  displayDialog: boolean;
  selectedProject: Project;
  newProject: boolean;
  loggedInUser: string;
  project: Project;

  ngOnInit(): void {
    this.getAllProjects();
    this.cols = [
      {field: 'id', header: 'ID', width: '150px'},
      {field: 'name', header: 'Project Name', width: '150px'},
      {field: 'description', header: 'Description', width: '150px'},
      {field: 'status', header: 'Status', width: '150px'},
      {field: 'duration', header: 'Duration', width: '150px'},
      {field: 'industry', header: 'Industry', width: '150px'},
      {field: 'customer', header: 'Customer', width: '150px'}
    ];

    this.loggedInUser = this.cookieService.get('username');
  }

  getAllProjects() {
    /**
     this.backendService.get('').subscribe(
     (projectList) => {
        this.projectsArray = projectList;
      }
     );**/
    this.projectsArray = [
      {id: 1, name: 'Project1', description: '....', status: true, duration: '10', industry: null, customer: null},
      {id: 2, name: 'Project2', description: 'Longer Description.', status: false, duration: '12', industry: null, customer: null}
    ];
  }

  onRowSelect(event) {
    this.project = this.cloneProject(event.data);
    this.newProject = false;
    this.displayDialog = true;
  }

  cloneProject(project: Project): Project {
    const proj = Object.assign({}, project);
    return proj;
  }

  showDialogToAdd() {
    this.newProject = true;
    this.project = {id: 1, name: '', description: '', status: true, duration: '', industry: null, customer: null};
    this.displayDialog = true;
    this.selectedProject = {id: null, name: '', description: '', status: true, duration: '', industry: null, customer: null};
  }

  save() {
    const projects = [...this.projectsArray];
    if (this.newProject) {
      projects.push(this.project);
    } else {
      projects[this.projectsArray.indexOf(this.selectedProject)] = this.project;
    }

    this.projectsArray = projects;
    this.project = {id: null, name: '', description: '', status: true, duration: '', industry: null, customer: null};
    this.displayDialog = false;
  }

  delete() {
    const index = this.projectsArray.indexOf(this.selectedProject);
    this.projectsArray = this.projectsArray.filter((val, i) => i !== index);
    this.project = null;
    this.displayDialog = false;
  }
}
