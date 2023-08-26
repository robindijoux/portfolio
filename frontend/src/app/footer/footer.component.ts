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
  links: { name: string; url: string; icon?: string;}[] = [
    {
      name: 'Github', 
      url: 'https://github.com/robindijoux',
      // icon: '/assets/img/github.svg'
      icon: '<i class="bi bi-github"></i>'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/robindijoux',
      // icon: '/assets/img/linkedin.svg'
      icon: '<i class="bi bi-linkedin"></i>'
    },
  ];

  constructor(private sanitizer: DomSanitizer) {
    
  }

  sanitizeIcon(str: string) {
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }

  navigateToExternalUrl(url: string) {
    window.open(url);
  }
}
