import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldOperationsComponent } from './field-operations.component';

describe('FieldOperationsComponent', () => {
  let component: FieldOperationsComponent;
  let fixture: ComponentFixture<FieldOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
