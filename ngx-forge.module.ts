import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsciidocComponent } from './src/app/components/asciidoc/asciidoc.component';
import { InputComponent } from './src/app/components/input/input.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ProjectSelect } from './src/app/components/project-select/project-select.component';
import { Config } from './src/app/service/config.component';
import { ForgeService } from './src/app/service/forge.service';
import { History } from './src/app/service/history.component';
import { AsciidocIndex } from './src/app/components/asciidoc/asciidoc.index';
import { AsciidocService } from './src/app/components/asciidoc/asciidoc.service';

const classes = [
  AsciidocComponent,
  InputComponent,
  ProjectSelect
];

@NgModule({
  imports: [CommonModule, FormsModule, MultiselectDropdownModule],
  exports: classes,
  declarations: classes,
  providers: [
    ForgeService,
    AsciidocIndex,
    AsciidocService,
    History,
    Config
  ],
  schemas: []
})
export class NgxForgeModule {
}

