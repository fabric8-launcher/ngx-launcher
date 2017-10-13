import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Config {
  protected settings: any;

  constructor(private http: Http) {
  }

  load(settingsLocation: string = 'settings.json'): Promise<Config> {
    this.http.get(settingsLocation).toPromise().then((settings) => {
      this.settings = Object.assign(this.settings, settings.json());
    }).catch(() => console.log('settings.json not found ignoring'));
    return Promise.resolve(this);
  }

  set(settings: any) {
    this.settings = settings;
  }

  get(key: string): string {
    return this.settings[key];
  }
}
