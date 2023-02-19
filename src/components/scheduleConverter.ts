import { IPost, ISchedule } from "../objects/schedule/schedule-interface";

export function MdToSchedule(markdown: string): ISchedule {
    const id =
        Array.from(markdown.matchAll(/(<!-- id=")(.*?)(" -->)/gs))[0][2] ?? "";
    let name =
        Array.from(markdown.matchAll(/(<!-- title -->\n)(.*?)(\n)/gs))[0][2] ??
        [];

    while (name.startsWith("#" || " ")) {
        name = name.substring(1);
    }

    markdown = markdown.replace(/<!-- week/gms, "<!-- week");
    const posts = Array.from(markdown.matchAll(/()([^]*)/gms)) ?? [];
    markdown = markdown.replace(//gms, "");

    let schedule: ISchedule = {
        id: id,
        name: name,
        posts: [],
    };

    for (const i in posts) {
        const item = posts[i][2];

        const id =
            Array.from(item.matchAll(/(<!-- id=")(.*?)(" -->)/gs))[0][2] ?? [];
        const week =
            Array.from(item.matchAll(/(<!-- week )(.*?)( -->)/gs))[0][2] ?? [];
        let title =
            Array.from(
                item.matchAll(
                    /((<!-- week .. -->\n)|(<!-- week . -->\n))(.*?)(\n)/gms
                )
            )[0][4] ?? [];

        while (title.startsWith("#" || " ")) {
            title = title.substring(1);
        }

        const content =
            Array.from(
                item.matchAll(/(<!-- content -->\n)(.*?)((<|$))/gs)
            )[0][2] ?? [];

        const assignments =
            Array.from(
                item.matchAll(/(<!-- assignments -->\n)(.*?)((<|$))/gs)
            )[0][2]
                .split("\n")
                .filter((assignment) => assignment !== "") ?? [];

        const post: IPost = {
            id: id,
            week: parseInt(week),
            title: title,
            content: content,
            assignments: assignments,
        };

        schedule.posts.push(post);
    }

    return schedule;
}

export function ScheduleToMd(schedule: ISchedule): string {
    let md = "";

    // Add Title
    md += `<!-- title -->\n${schedule.name}\n`;
    // Add Id
    md += `<!-- id="${schedule.id}" -->\n`;

    for (const i in schedule.posts) {
        const post = schedule.posts[i];

        // Add Week
        md += `<!-- week ${post.week} -->\n${post.title}\n`;
        // Add Content
        md += `<!-- content -->\n${post.content}\n`;
    }

    return md;
}
