import { Injectable, OpaqueToken } from '@angular/core';

@Injectable()
export class AuthHelperService  {

    AUTH_API_URL: OpaqueToken;
    constructor() {}

    getAuthApiURl(): OpaqueToken {
        return this.AUTH_API_URL;
    }
}
