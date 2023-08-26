import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass'],
  host: {
    class: 'flex-fill'
  }
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value.title)
      this.projectForm.reset()
    }
  }
}