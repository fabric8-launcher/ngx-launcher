import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DependencyCheck } from '../../app/launcher/launcher.module';
import { DependencyCheckService } from '../../app/launcher/launcher.module';

@Injectable()
export class DemoDependencyCheckService implements DependencyCheckService {
  /**
   * Returns project dependencies
   *
   * @returns {Observable<DependencyCheck>} Project dependencies
   */
  getDependencyCheck(): Observable<DependencyCheck> {
    return Observable.of({
      mavenArtifact: 'd4-345',
      groupId: 'io.openshift.booster',
      projectName: 'app-test-1',
      projectVersion: '1.0.0-SNAPSHOT',
      spacePath: '/myspace'
    });
  }

  /**
   * Validate the project name and returns a boolean value
   *
   * @param  {string} projectName
   * @returns boolean
   */
  validateProjectName(projectName: string): boolean {
    const pattern = /^[a-z][a-z0-9-]{3,63}$/;
    return pattern.test(projectName);
  }
}
