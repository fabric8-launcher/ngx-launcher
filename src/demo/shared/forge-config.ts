import { Location } from '@angular/common';
import { Inject, Injectable, OpaqueToken } from '@angular/core';

import { Config } from '../../app/service/config.component';

import { FABRIC8_FORGE_API_URL } from './forge-api-url';

@Injectable()
export class ForgeConfig extends Config {

  constructor(@Inject(FABRIC8_FORGE_API_URL) private apiUrl: string) {
    super();
    let settings = {backend_url: 'TO_BE_DEFINED'};

    if (apiUrl) {
      settings['backend_url'] = Location.stripTrailingSlash(apiUrl) + '/api/';
    }
    this.settings = settings;
  }
}
