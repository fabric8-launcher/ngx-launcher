import { ProjectNameValidatorDirective } from './project-name.validator';

describe('should check pattern to valdidate Project name', () => {

  it('validate Project Name to be falsy if start with special character', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('#app-may-11-2018-1');
    expect(valProjectName).toBeFalsy();
  });

  it('validate Project Name to be falsy if ends with special character', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('app-may-11-2018-1@');
    expect(valProjectName).toBeFalsy();
  });

  it('validate Project Name to be falsy if has any special character apart from - and _', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('app-may-11-2018@1');
    expect(valProjectName).toBeFalsy();
  });

  it('validate Project Name to be falsy if ends with  _', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('app-may-11-2018-1_');
    expect(valProjectName).toBeFalsy();
  });

  it('validate Project Name to be falsy if ends with  -', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('app-may-11-2018-1-');
    expect(valProjectName).toBeFalsy();
  });

  it('validate Project Name to be truthy', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('app-may-11-2018-1');
    expect(valProjectName).toBeTruthy();
  });

  it('validate Project Name to be falsy as length is not satisfied', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('ap');
    expect(valProjectName).toBeFalsy();
  });

  it('validate Project Name to be falsy as length is not satisfied', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('12345678901234567890123456789012345678901');
    expect(valProjectName).toBeFalsy();
  });

  it('validate Project Name to be truthy as length is satisfied', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('a123456789012345678901234567890123456789');
    expect(valProjectName).toBeTruthy();
  });

  it('should return false if the project name has continous hyphens (-)', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('app_name--name');
    expect(valProjectName).toBeFalsy();
  });

  it('should return false if the project name has continous underscores (_)', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('app_name__name');
    expect(valProjectName).toBeFalsy();
  });

  it('should not allow project name with spaces', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('app_name name');
    expect(valProjectName).toBeFalsy();
  });

  it('should not allow project name starting with a number', () => {
    let valProjectName = ProjectNameValidatorDirective.pattern.test('1app_namename');
    expect(valProjectName).toBeFalsy();
  });

});
