import {Input, Option} from './base.model';

export class OpenshiftIOInput extends Input {
  description: string;
  gitRepositories?: any[];
  display?: any; // Add a generic field for UI display
}

export class OpenshiftIOOption extends Option {
  selected: boolean; // Add for component multiple-select list
  visible: boolean; // Add for multi-select list filtering
  descriptionMarkdown: string; // pipeline-view
  display: any; // pipeline-view
  stages: any; // pipeline-view
}
