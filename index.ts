import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsciidocComponent } from './src/app/asciidoc/asciidoc.component';
import { InputComponent } from './src/app/input/input.component';
import { ProjectSelect } from './src/app/project-select/project-select';
import { Config } from './src/app/service/config.component';
import { ForgeService } from './src/app/service/forge.service';
import { History } from './src/app/service/history.component';

export * from './src/app/model/base.model';
export * from './src/app/model/gui.model';

const classes = [
  AsciidocComponent,
  InputComponent,
  ProjectSelect,
  Config,
  ForgeService,
  History
];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: classes,
  declarations: classes
})
export class NgxForgeModule {
}

