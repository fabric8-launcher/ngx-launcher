import { Injectable } from '@angular/core';
import { Gui, Input } from '../model/base.model';

@Injectable()
export class History {
  state: Gui[] = [];
  ready: boolean;

  add(gui: Gui) {
    this.state.push(gui);
    gui.stepIndex = this.stepIndex;
  }

  done() {
    this.ready = true;
  }

  apply(state: string) {
    if (state == null || state === '') return;
    let submittableGui: Gui;
    try {
      submittableGui = JSON.parse(atob(state));
    } catch (e) {
      return;
    }

    if (submittableGui.inputs) {
      for (let input of submittableGui.inputs) {
        for (let gui of this.state) {
          for (let guiInput of gui.inputs) {
            if (guiInput.name === input.name) {
              guiInput.value = input.value;
            }
          }
        }
      }
    }
  }

  get(index: number): Gui {
    return this.state[index - 1];
  }

  get currentGui(): Gui {
    return this.ready ? this.state[this.stepIndex - 1] : new Gui();
  }

  get stepIndex(): number {
    return Math.max(0, this.state.length);
  }

  resetTo(index: number) {
    this.ready = false;
    this.state.splice(index, this.state.length);
  }

  convert(stepIndex = this.stepIndex - 1): Gui {
    let submittableGui = new Gui();
    submittableGui.stepIndex = stepIndex;
    submittableGui.inputs = [];
    for (let gui of this.state) {
      let inputs = gui.inputs;
      if (inputs) {
        let submittableInputs = this.convertToSubmittable(inputs as Input[]);
        submittableGui.inputs = submittableGui.inputs.concat(submittableInputs);
      }
    }
    return submittableGui;
  }

  updateFormValues(values: any, stepIndex = this.stepIndex - 1): void {
    let gui = this.state[stepIndex];
    for (let input of gui.inputs) {
      for (let key of Object.keys(values)) {
        if (input.name === key) {
          input.value = values[key];
        }
      }
    }
  }

  toString(): string {
    return btoa(JSON.stringify(this.convert()));
  }

  private convertToSubmittable(inputs: Input[]): Input[] {
    let array: Input[] = [];
    if (inputs) {
      for (let input of inputs) {
        array.push(new Input(input));
      }
    }
    return array;
  }
}
