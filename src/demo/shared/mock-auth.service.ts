import {Injectable} from '@angular/core';
@Injectable()
export class MockAuthenticationService {
    getToken(): string {
        let token: string = process.env['OSIO_AUTH_TOKEN'];
        return token;
    }
}
