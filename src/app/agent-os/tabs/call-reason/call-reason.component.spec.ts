import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallReasonComponent } from './call-reason.component';

describe('CallReasonComponent', () => {
  let component: CallReasonComponent;
  let fixture: ComponentFixture<CallReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
