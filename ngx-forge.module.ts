import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsciidocComponent } from './src/app/asciidoc/asciidoc.component';
import { InputComponent } from './src/app/input/input.component';
import { ProjectSelect } from './src/app/project-select/project-select';
import { Config } from './src/app/service/config.component';
import { ForgeService } from './src/app/service/forge.service';
import { History } from './src/app/service/history.component';
import { AsciidocService } from './src/app/asciidoc/asciidoc.service';

const classes = [
  AsciidocComponent,
  InputComponent,
  ProjectSelect
];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: classes,
  declarations: classes,
  providers: [
    ForgeService,
    AsciidocService,
    History,
    {provide: APP_INITIALIZER, useFactory: (config: Config) => () => config.load(), deps: [Config], multi: true}
  ]
})
export class NgxForgeModule {
}

