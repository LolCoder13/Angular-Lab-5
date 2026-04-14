import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddepartmentForm } from './adddepartment-form';

describe('AdddepartmentForm', () => {
  let component: AdddepartmentForm;
  let fixture: ComponentFixture<AdddepartmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdddepartmentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdddepartmentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
