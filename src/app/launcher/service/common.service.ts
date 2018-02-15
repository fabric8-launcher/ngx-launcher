import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'ngx-login-client';

import { Config } from '../../service/config.component';

@Injectable()
export class CommonService  {

    private keys: any = {
        BACKEND: 'backend_url',
        ORIGIN: 'origin'
    };

    constructor(
        private config: Config,
        private authenticationService: AuthenticationService
    ) {}

    getBackendUrl(): string {
        if (this.config) {
            return this.config.get(this.keys.BACKEND);
        }
        return null;
    }

    getAuthToken(): string {
        return this.authenticationService.getToken();
    }

    getOrigin(): string {
        if (this.config) {
            return this.config.get(this.keys.ORIGIN);
        }
        return null;
    }

}
