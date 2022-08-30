import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOsMainComponent } from './agent-os-main.component';

describe('AgentOsMainComponent', () => {
  let component: AgentOsMainComponent;
  let fixture: ComponentFixture<AgentOsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentOsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentOsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
