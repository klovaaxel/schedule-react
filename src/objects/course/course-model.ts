import ICourse from "./course-interface";

export class CourseModel {
    public id: string;
    public name: string;
    public scheduleUrl: string;
    public scheduleData: string;

    constructor(data: ICourse | null) {
        this.id = !!data && !!data.id ? data.id : "";
        this.name = !!data && !!data.name ? data.name : "";
        this.scheduleUrl = !!data && !!data.scheduleUrl ? data.scheduleUrl : "";
        this.scheduleData = "";
    }
}
