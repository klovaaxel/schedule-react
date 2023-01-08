export interface ISchedule {
    id: string;
    name: string;
    posts: IPost[];
}

export interface IPost {
    id: string;
    sequenceNumber: number;
    title: string;
    content: string;
}
