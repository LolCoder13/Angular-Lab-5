import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeStudent } from './grade-student';

describe('GradeStudent', () => {
  let component: GradeStudent;
  let fixture: ComponentFixture<GradeStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeStudent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
