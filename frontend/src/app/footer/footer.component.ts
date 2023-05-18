import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
  host: {
    class: 'mt-5'
  }
})
export class FooterComponent {
  links: { name: string; url: string; icon?: SafeHtml;}[] = [
    {
      name: 'Github', 
      url: 'https://github.com/robindijoux',
      icon: '/assets/img/github.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/robindijoux',
      icon: '/assets/img/linkedin.svg'
    },
  ];

  constructor(private sanitizer: DomSanitizer) {
    
  }

  navigateToExternalUrl(url: string) {
    window.open(url);
  }
}
