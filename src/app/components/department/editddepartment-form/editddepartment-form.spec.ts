import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditddepartmentForm } from './editddepartment-form';

describe('EditddepartmentForm', () => {
  let component: EditddepartmentForm;
  let fixture: ComponentFixture<EditddepartmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditddepartmentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EditddepartmentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
