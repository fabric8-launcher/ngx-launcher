import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, XHRBackend, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ForgeService } from './forge.service';
import {
  commandInfoExpectedResponse,
  executeInput,
  executeOutput,
  nextStepExpectedResponse,
  nextStepInput
} from './forge.service.mock';

import { History } from './history.component';
import { Gui, Version } from '../model/base.model';
import { Config } from './config.component';

describe('Forge Service:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend, useClass: MockBackend
        },
        ForgeService,
        {
          provide: Config,
          useFactory: () => {
            return {
              load(): Promise<any> {
                this.settings = {'backend_url': 'http://some.url'};
                return this.settings;
              }
            } as Config;
          }
        }]
    });
  });

  it('Get commandInfo successfully', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {

      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(commandInfoExpectedResponse),
            status: 200
          })
        ));
        expect(connection.request.url).toBe('http://some.url/');
      });
      // when
      forgeService.commandInfo('git-import-wizard').then((data: any) => {
        // then
        expect(data).toEqual(commandInfoExpectedResponse);
      });
    });
  });


  it('Get commandInfo in error of type Error', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockError(new Error('some error'));
      });
      // when
      forgeService.commandInfo('git-import-wizard').then(() => {
          fail('Get commandInfo in error');
        }, // then
        error => expect(error.name).toEqual('some error'));
    });
  });

  it('Post nextStep successfully', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(nextStepExpectedResponse),
            status: 200
          })
        ));
      });
      let h = new History();
      h.state = nextStepInput.state;
      h.ready = nextStepInput.ready;
      // when
      forgeService.nextStep('git-import-wizard', h).then((data: any) => {
        // then
        expect(data).toEqual(nextStepExpectedResponse);
      });
    });
  });

  it('Post nextStep in error of type Error', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockError(new Error('some error'));
      });
      let h = new History();
      h.state = nextStepInput.state;
      h.ready = nextStepInput.ready;
      // when
      forgeService.nextStep('git-import-wizard', h).then(() => {
          fail('Post nextStep in error');
        }, // then
        error => expect(error.name).toEqual('some error'));
    });
  });

  it('Post executeStep successfully', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(executeOutput),
            status: 200
          })
        ));
      });
      let h = new History();
      h.state = executeInput.state;
      h.ready = executeInput.ready;
      // when
      forgeService.executeStep('git-import-wizard', h).then((data: any) => {
        // then
        expect(data).toEqual(executeOutput);
      });
    });
  });

  it('Post executeStep in error of type Error', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockError(new Error('some error'));
      });
      let h = new History();
      h.state = executeInput.state;
      h.ready = executeInput.ready;
      // when
      forgeService.executeStep('git-import-wizard', h).then(() => {
          fail('Post executeStep in error');
        }, // then
        error => expect(error.name).toEqual('some error'));
    });
  });

  it('Post successfully', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(nextStepExpectedResponse),
            status: 200
          })
        ));
      });
      let gui = new Gui();
      gui.inputs = [{
        'name': 'gitOrganisation',
        'shortName': '',
        'description': '',
        'valueType': 'io.fabric8.forge.generator.git.GitOrganisationDTO',
        'inputType': 'org.jboss.forge.inputType.DEFAULT',
        'enabled': true,
        'required': true,
        'deprecated': false,
        'label': 'Organisation',
        'valueChoices': [],
        'class': 'UISelectOne',
        'value': 'corinnekrych'
      }];
      // when
      forgeService.action(gui).then((data: any) => {
        // then
        expect(data).toEqual(nextStepExpectedResponse);
      });
    });
  });

  it('Load GUI for init', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(commandInfoExpectedResponse),
            status: 200
          })
        ));
      });
      let h = new History();
      h.state = [];
      h.ready = true;
      // when
      forgeService.loadGui('git-import-wizard', h).then((data: any) => {
        // then
        expect(data).toEqual(commandInfoExpectedResponse);
      });
    });
  });

  it('Load GUI for next', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(nextStepExpectedResponse),
            status: 200
          })
        ));
      });
      let h = new History();
      h.state = nextStepInput.state;
      h.ready = true;
      // when
      forgeService.loadGui('git-import-wizard', h).then((data: any) => {
        // then
        expect(data).toEqual(nextStepExpectedResponse);
      });
    });
  });

  it('Backend version', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      let version = {backendVersion: '1'} as Version;
      mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(version),
            status: 200
          })
        ));
      });

      // when
      forgeService.version().then((data: any) => {
        // then
        expect(data).toEqual(version);
      });
    });
  });

  it('Download zip', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify({}),
            status: 200
          })
        ));
      });

      let h = new History();
      h.state = nextStepInput.state;
      h.ready = true;

      // when
      forgeService.downloadZip('download', h);
    });
  });

  it('additional headers', () => {
    inject([
      XHRBackend,
      ForgeService
    ], (mockService: MockBackend, forgeService: ForgeService) => {
      // given
      let passedHeaders = new Headers();
      passedHeaders.append('passed', 'value');
      let receivedHeaders = mockService.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify({}),
            status: 200
          })
        ));
        return connection.headers;
      });

      // when
      forgeService.upload('dummy', new History(), passedHeaders)
      .then(() => {
        // then
        expect(receivedHeaders.get('passed')).toBe('value');
      });
    });
  });
});

