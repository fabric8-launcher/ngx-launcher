import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Config {
  protected settings: any;

  constructor(private http: Http) {
  }

  load(settingsLocation: string = 'settings.json'): Promise<any> {
    return this.http.get(settingsLocation).toPromise().then((settings) => {
      this.settings = settings.json();
    }).catch(() => console.log('settings.json not found ignoring'));
  }

  set(settings: any) {
    this.settings = settings;
  }

  get(key: string): string {
    return this.settings[key];
  }
}
