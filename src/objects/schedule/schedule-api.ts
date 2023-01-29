import { MdToSchedule } from "../../components/scheduleConverter";
import { ISchedule } from "./schedule-interface";

export async function GetScehdule({
    queryKey,
}: any): Promise<ISchedule | null | undefined> {
    const [_, url] = queryKey;

    const request = await fetch(url);
    if (!request.ok) {
        return null;
    }

    const response = await request.text();
    const schedule: ISchedule = MdToSchedule(response);

    console.log("Fetched Schedule");
    console.log(schedule);

    return schedule;
}
