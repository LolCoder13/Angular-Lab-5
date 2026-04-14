export interface CourseModel {
    crsId: number;
    crsName: string;
    crsDuration: number | null
    deptId: number;
    deptName: string;
    activeStudents: number;
}
