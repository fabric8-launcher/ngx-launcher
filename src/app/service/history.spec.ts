import { Gui, Input } from '../model/base.model';
import { History } from './history.component';

describe('History and deep linking', () => {
  it('should build History based on param', () => {
    // given
    let gui = new Gui();
    gui.inputs = [{name: 'input', value: 'the-value'}] as Input[];

    let pristineGui = new Gui();
    pristineGui.inputs = [{name: 'input', value: ''}] as Input[];

    // when
    let history = new History();
    history.add(pristineGui);
    history.apply(btoa(JSON.stringify(gui)));

    expect(history.get(1)).toBeDefined('no gui restored?');
    expect(history.get(1).inputs[0].value).toBe('the-value');
  });

  it('should return state as base64 string', () => {
    // given
    let gui1 = new Gui();
    gui1.inputs = [{name: 'input', value: 'the-value'}] as Input[];

    let gui2 = new Gui();
    gui2.inputs = [{name: 'input', value: ''}] as Input[];

    // when
    let history = new History();
    history.add(gui1);
    history.add(gui2);

    // then
    expect(history.get(1)).toBeDefined('no gui restored?');
    expect(history.get(1).inputs[0].value).toBe('the-value');

    expect(history.get(2)).toBeDefined('no gui restored?');
    expect(history.get(2).inputs[0].value).toBe('');

    expect(history.toString()).toBe('eyJzdGF0ZSI6e30sInN0ZXBJbmRleCI6MSwiaW5w' +
      'dXRzIjpbeyJuYW1lIjoiaW5wdXQiLCJ2YWx1ZSI6InRoZS12YWx1ZSJ9LHsibmFtZSI6ImlucHV0IiwidmFsdWUiOiIifV19');
  });

  it('remove no longer needed gui', () => {
    // given
    let gui1 = new Gui();
    gui1.inputs = [{name: 'input', value: 'the-value'}] as Input[];

    let gui2 = new Gui();
    gui2.inputs = [{name: 'input', value: ''}] as Input[];

    let history = new History();
    history.add(gui1);
    history.add(gui2);

    // when
    history.resetTo(1);

    // then
    expect(history.get(1)).toBeDefined();
    expect(history.get(1).inputs[0].value).toBe('the-value');
    expect(history.get(1).stepIndex).toBe(1);

    expect(history.get(2)).toBeUndefined('not reset?');
  });

  it('should not blow up when no state is given', () => {
    // given
    let history = new History();

    // when
    try {
      history.apply('');
    } catch (ex) {
      fail('should not throw exception');
    }
  });

  it('should not blow up when invalid state is given', () => {
    // given
    let history = new History();

    // when
    try {
      // { a : b
      history.apply('eydhJzonYic=');
    } catch (ex) {
      console.log(ex);
      fail('should not throw exception');
    }
  });

});
