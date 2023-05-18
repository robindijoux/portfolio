import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from '../services/content/content.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass'],
  host: {
    class: 'flex-fill'
  }
})
export class ProjectFormComponent implements OnInit {
  contentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private contentService: ContentService) { }

  ngOnInit() {
    this.contentForm = this.formBuilder.group({
      title: ['', Validators.required],
      paragraphs: this.formBuilder.array([])
    });
  }

  get paragraphForms() {
    return this.contentForm.get('paragraphs') as FormArray;
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
    if (this.contentForm.valid) {
      this.contentService.createContent(this.contentForm.value.title, this.contentForm.value.paragraphs)
      this.contentForm.reset()
    }
  }
}