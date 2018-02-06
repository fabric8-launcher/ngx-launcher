import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MissionRuntimeService } from '../../app/launcher/launcher.module';
import { Mission } from '../../app/launcher/launcher.module';
import { Runtime } from '../../app/launcher/launcher.module';

@Injectable()
export class DemoMissionRuntimeService implements MissionRuntimeService {

  constructor() {
  }

  getMissions(): Observable<Mission[]> {
    let missions = Observable.of([{
        "id": "crud",
        "name": "CRUD",
        "suggested": false,
        "runtimes": [
        ],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
    },
    {
        "id": "circuit-breaker",
        "name": "Circuit Breaker",
        "suggested": false,
        "runtimes": [
            "vert.x",
            "nodejs",
            "spring-boot",
            "wildfly-swarm"
        ],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
    },
    {
        "id": "configmap",
        "name": "Externalized Configuration",
        "suggested": false,
        "runtimes": [
            "vert.x",
            "nodejs",
            "spring-boot",
            "wildfly-swarm"
        ],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
    },
    {
        "id": "health-check",
        "name": "Health Check",
        "suggested": false,
        "runtimes": [
            "vert.x",
            "nodejs",
            "spring-boot",
            "wildfly-swarm"
        ],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
    },
    {
        "id": "rest-http",
        "name": "REST API Level 0",
        "suggested": false,
        "runtimes": [
            "vert.x",
            "nodejs",
            "spring-boot",
            "wildfly-swarm"
        ],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
    },
    {
        "id": "rest-http-secured",
        "name": "Secured",
        "suggested": false,
        "runtimes": [
            "vert.x",
            "nodejs",
            "spring-boot",
            "wildfly-swarm"
        ],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
    }] as Mission[]);
    return missions;
  }

  getRuntimes(): Observable<Runtime[]> {
    let runtimes = Observable.of([
      {
        'runtimeId': 'SpringBoot',
        'title': 'Spring Boot',
        'description': 'Brief description of the technology...',
        'logo': '/assets/images/spring-boot-logo.png',
        'supportedMissions': [],
        'versions': ['v1.0.0', 'v1.0.1', 'v2.0.1'],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
      }, {
        'runtimeId': 'Nodejs',
        'title': 'Node.js',
        'disabled': true,
        'description': 'Brief description of the technology...',
        'logo': '/assets/images/nodejs-logo.png',
        'supportedMissions': [],
        'versions': ['v1.0.0', 'v3.0.1', 'v3.0.2'],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
      }, {
        'runtimeId': 'Eclipse Vert.x',
        'title': 'Eclipse Vert.x',
        'description': 'Brief description of the technology...',
        'logo': '/assets/images/vertx.svg',
        'supportedMissions': [],
        'versions': ['v1.0.0'],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
      }, {
        'runtimeId': 'Wildfly Swarm',
        'title': 'Wildfly Swarm',
        'description': 'Brief description of the technology...',
        'logo': '/assets/images/wildfly-swarm.png',
        'supportedMissions': [],
        'versions': ['v1.0.0', 'v2.0.0', 'v2.0.1'],
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
      }
    ] as Runtime[]);
    return runtimes;
  }
}
