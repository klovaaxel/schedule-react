import ICourse from "./i-course";

interface IGroup {
    id: string;
    name: string;
    courses?: ICourse[];
}

export default IGroup;
