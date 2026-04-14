import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseForm } from './edit-course-form';

describe('EditCourseForm', () => {
  let component: EditCourseForm;
  let fixture: ComponentFixture<EditCourseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourseForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCourseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
