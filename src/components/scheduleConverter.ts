import { IPost, ISchedule } from "../objects/schedule/schedule-interface";

export function MdToSchedule(markdown: string): ISchedule {
    const id = markdown.match(/(?<=<!-- id=")(.*?)(?=" -->)/gs) ?? [];
    const name = markdown.match(/(?<=<!-- title -->\n)(.*?)(?=\n)/gs) ?? [];

    if (name[0].startsWith("# ")) {
        name[0] = name[0].substring(2);
    }

    const posts = markdown.match(/<!-- week(?:(?!<!-- week).)*/gms) ?? [];

    let schedule: ISchedule = {
        id: id[0],
        name: name[0],
        posts: [],
    };

    for (const i in posts) {
        const item = posts[i];

        const id = item.match(/(?<=<!-- id=")(.*?)(?=" -->)/gs) ?? [];
        const week = item.match(/(?<=<!-- week )(.*?)(?= -->)/gs) ?? [];
        const title =
            item.match(
                /((?<=<!-- week .. -->\n)|(?<=<!-- week . -->\n)).*?(?=\n)/gms
            ) ?? [];

        if (title[0].startsWith("## ")) {
            title[0] = title[0].substring(3);
        }

        const content =
            item.match(/(?<=<!-- content -->\n)(.*?)(?=(<|$))/gs) ?? [];

        console.log(item);

        const post: IPost = {
            id: id[0],
            week: parseInt(week[0]),
            title: title[0],
            content: content[0],
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
