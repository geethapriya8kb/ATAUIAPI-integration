import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLearnMoreComponent } from './mobile-learn-more.component';

describe('MobileLearnMoreComponent', () => {
  let component: MobileLearnMoreComponent;
  let fixture: ComponentFixture<MobileLearnMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileLearnMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileLearnMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
