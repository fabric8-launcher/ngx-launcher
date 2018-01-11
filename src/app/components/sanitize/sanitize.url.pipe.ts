import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeUrl', pure: false })
export class SanitizeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(content);
  }
}
