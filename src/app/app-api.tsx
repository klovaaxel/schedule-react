export const GetCourses = async () => {
    const response = await window.fetch(
        "https://raw.githubusercontent.com/tcstenungsund/schedule/main/md/weuweb01-ind.md"
    );

    // if (response.ok) {
    //     const courses = await response.text();
    //     console.log(courses);
    // }
};
