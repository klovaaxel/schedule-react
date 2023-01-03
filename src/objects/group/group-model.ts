import { CourseModel } from "../course/course-model";
import IGroup from "./group-inteface";

export class GroupModel {
    public id: string;
    public enrollYear: number | null;
    public gradYear: number | null;
    public courses: CourseModel[] | null;

    constructor(data: IGroup | null) {
        this.id = !!data && !!data.id ? data.id : "";
        this.enrollYear = !!data && !!data.enrollYear ? data.enrollYear : null;
        this.gradYear = !!data && !!data.gradYear ? data.gradYear : null;
        this.courses = !!data && !!data.courses ? data.courses : null;
    }
}
