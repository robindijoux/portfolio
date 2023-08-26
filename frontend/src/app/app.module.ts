import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectComponent } from './project/project.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProjectFormComponent } from './project-form/project-form.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/jwt.interceptor';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectComponent,
    ProjectFormComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'header': [1, 2, 3, false] }],
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': 'left' }, { 'align': 'center' }, { 'align': 'right' }],
          ['clean'],                                         // remove formatting button
          ['link', 'image', 'video']                         // link and image, video
        ]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  icons = Quill.import('ui/icons');

  constructor() {
    this.icons['bold'] = '<i class="bi bi-type-bold"></i>';
    this.icons['italic'] = '<i class="bi bi-type-italic"></i>';
    this.icons['underline'] = '<i class="bi bi-type-underline"></i>';
    this.icons['strike'] = '<i class="bi bi-type-strikethrough"></i>';
    this.icons['blockquote'] = '<i class="bi bi-blockquote-left"></i>';
    this.icons['code-block'] = '<i class="bi bi-code-square"></i>';
    this.icons['header'] = '<i class="bi bi-type-h1"></i>';
    this.icons['list']['bullet'] = '<i class="bi bi-list-ul"></i>';
    this.icons['list']['ordered'] = '<i class="bi bi-list-ol"></i>';
    this.icons['bullet'] = '<i class="bi bi-list-task"></i>';
    this.icons['indent']['-1'] = '<i class="bi bi-unindent"></i>';
    this.icons['indent']['+1'] = '<i class="bi bi-indent"></i>';
    this.icons['direction'] = '<i class="bi bi-text-right"></i>';
    this.icons['size'] = '<i class="bi bi-textarea-t"></i>';
    this.icons['color'] = '<i class="bi bi-palette"></i>';
    this.icons['background'] = '<i class="bi bi-paint-bucket"></i>';
    this.icons['font'] = '<i class="bi bi-type"></i>';
    this.icons['align']['right'] = '<i class="bi bi-text-right"></i>';
    this.icons['align']['center'] = '<i class="bi bi-text-center"></i>';
    this.icons['align']['left'] = '<i class="bi bi-text-left"></i>';
    this.icons['clean'] = '<i class="bi bi-x-circle"></i>';
    this.icons['link'] = '<i class="bi bi-link-45deg"></i>';
    this.icons['image'] = '<i class="bi bi-image"></i>';
    this.icons['video'] = '<i class="bi bi-camera-video"></i>';
  }

}
