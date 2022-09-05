import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpvComponent } from './ppv.component';

describe('PpvComponent', () => {
  let component: PpvComponent;
  let fixture: ComponentFixture<PpvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
