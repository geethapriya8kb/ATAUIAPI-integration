import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewMoreComponent } from './mobile-view-more.component';

describe('MobileViewMoreComponent', () => {
  let component: MobileViewMoreComponent;
  let fixture: ComponentFixture<MobileViewMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileViewMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileViewMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
