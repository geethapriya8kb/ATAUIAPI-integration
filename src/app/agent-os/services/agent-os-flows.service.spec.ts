import { TestBed } from '@angular/core/testing';

import { AgentOsFlowsService } from './agent-os-flows.service';

describe('AgentOsFlowsService', () => {
  let service: AgentOsFlowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentOsFlowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
