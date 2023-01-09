export interface ISchedule {
    id: string;
    name: string;
    posts: IPost[];
}

export interface IPost {
    id: string;
    week: number;
    title: string;
    content: string;
}
