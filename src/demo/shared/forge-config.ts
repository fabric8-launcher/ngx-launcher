import { Location } from '@angular/common';
import { Inject, Injectable, OpaqueToken } from '@angular/core';

import { Config } from '../../app/service/config.component';

import { FABRIC8_FORGE_API_URL } from './forge-api-url';
import { FABRIC8_ORIGIN } from './forge-origin';

@Injectable()
export class ForgeConfig extends Config {

  constructor(@Inject(FABRIC8_FORGE_API_URL) private apiUrl: string, @Inject(FABRIC8_ORIGIN) private origin: string) {
    super();
    let settings = {
      backend_url: '',
      origin: ''
    };

    if (apiUrl) {
      settings['backend_url'] = Location.stripTrailingSlash(apiUrl) + '/api/';
      settings['origin'] = origin;
    }
    this.settings = settings;
  }
}
