import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceConnectivityComponent } from './device-connectivity.component';

describe('DeviceConnectivityComponent', () => {
  let component: DeviceConnectivityComponent;
  let fixture: ComponentFixture<DeviceConnectivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceConnectivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceConnectivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
