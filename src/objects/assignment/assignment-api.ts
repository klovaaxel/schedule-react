export async function GetAssignment(assignmentUrl: string) {
    const request = await window.fetch(assignmentUrl);
    if (!request.ok) return request.status;

    const assignment = await request.text();

    console.log("Assignment:", assignment);

    var showdown = require("showdown"),
        converter = new showdown.Converter(),
        html = converter.makeHtml(assignment);

    return html;
}
