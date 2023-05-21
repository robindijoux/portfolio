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
      title: ['', Validators.required],
      paragraphs: this.formBuilder.array([])
    });
  }

  get paragraphForms() {
    return this.projectForm.get('paragraphs') as FormArray;
  }

  addParagraph() {
    const paragraph = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.paragraphForms.push(paragraph);
  }

  removeParagraph(index: number) {
    this.paragraphForms.removeAt(index);
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value.title, this.projectForm.value.paragraphs)
      this.projectForm.reset()
    }
  }
}