import { Observable, Subject } from 'rxjs';

import { Progress } from '../model/progress.model';

/**
 * Abstract project progress service provided to ensure consumer implements this pattern
 */
export abstract class ProjectProgressService {

  abstract statusMessages: Subject<any>;
  /**
   * Retrieve progress list
   * @returns {Observable<Progress[]>}
   */
  abstract getProgress(uuidLink: string): Observable<Progress[]>;
  abstract connect(uuidLink: string): any;
}
