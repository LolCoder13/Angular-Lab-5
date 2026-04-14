import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeList } from './student-grade-list';

describe('StudentGradeList', () => {
  let component: StudentGradeList;
  let fixture: ComponentFixture<StudentGradeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentGradeList],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentGradeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
