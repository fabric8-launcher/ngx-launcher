import { Observable, Subject } from 'rxjs';

import { Progress } from '../model/progress.model';

/**
 * Abstract project progress service provided to ensure consumer implements this pattern
 */
export abstract class ProjectProgressService {

  abstract progressMessages: Subject<MessageEvent>;
  /**
   * Retrieve progress list
   * @returns {Observable<Progress[]>}
   */
  abstract getProgress(uuidLink: string): WebSocket;
}
