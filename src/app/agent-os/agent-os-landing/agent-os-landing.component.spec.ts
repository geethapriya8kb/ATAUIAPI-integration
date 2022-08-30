import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOsComponent } from './agent-os-landing.component';

describe('AgentOsComponent', () => {
  let component: AgentOsComponent;
  let fixture: ComponentFixture<AgentOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentOsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
