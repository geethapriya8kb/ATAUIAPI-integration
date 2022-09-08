import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessManageWalletComponent } from './success-manage-wallet.component';

describe('SuccessManageWalletComponent', () => {
  let component: SuccessManageWalletComponent;
  let fixture: ComponentFixture<SuccessManageWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessManageWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessManageWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
