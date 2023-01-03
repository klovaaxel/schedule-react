import { CourseModel } from "../course/course-model";

interface IGroup {
    id: string;
    enrollYear: number;
    gradYear: number;
    courses?: CourseModel[];
}

export default IGroup;
