import { Component, Host, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { WizardComponent } from '../wizard.component';
import { MissionRuntimeService } from '../service/mission-runtime.service';
import { Subscription } from 'rxjs/Subscription';
import { Runtime } from '../model/runtime.model';
import { Mission } from '../model/mission.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-missionruntime-step',
  templateUrl: './mission-runtime-step.component.html',
  styleUrls: ['./mission-runtime-step.component.less']
})
export class MissionRuntimeStepComponent implements OnInit, OnDestroy {
  public missions: Mission[];
  public runtimes: Runtime[]

  private subscriptions: Subscription[] = [];

  constructor(@Host() public wizardComponent: WizardComponent,
              private missionRuntimeService: MissionRuntimeService) {
  }

  ngOnInit() {
    let missionSubscription = this.missionRuntimeService.getMissions().subscribe((result) => {
      this.missions = result;
    });
    let runtimeSubscription = this.missionRuntimeService.getRuntimes().subscribe((result) => {
      this.runtimes = result;
    });
    this.subscriptions.push(missionSubscription);
    this.subscriptions.push(runtimeSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
