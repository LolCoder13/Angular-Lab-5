import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCourseDialog } from './assign-course-dialog';

describe('AssignCourseDialog', () => {
  let component: AssignCourseDialog;
  let fixture: ComponentFixture<AssignCourseDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCourseDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignCourseDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
