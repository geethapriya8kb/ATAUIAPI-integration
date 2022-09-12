import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAuthentiacteComponent } from './verify-authentiacte.component';

describe('VerifyAuthentiacteComponent', () => {
  let component: VerifyAuthentiacteComponent;
  let fixture: ComponentFixture<VerifyAuthentiacteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyAuthentiacteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyAuthentiacteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
