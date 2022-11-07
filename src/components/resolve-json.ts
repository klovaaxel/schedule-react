const resolveJSON = async (json: any) => {
    let string = JSON.stringify(json);
    const refrenceObjects =
        string
            .match(/({[^{]*"@ref":[ ]?"[^,]*"[^}]*})/g)
            ?.map((str) => JSON.parse(str)) ?? [];

    for (const ref of refrenceObjects) {
        const refUrl = ref["@ref"];
        let url = refUrl;
        let itemKey;

        if (url.includes("#")) {
            url = refUrl.split("#")[0] ?? null;
            itemKey = refUrl.split("#")[1] ?? null;
        }

        const response = await window.fetch(process.env.PUBLIC_URL + url);
        const text = await response.text();
        if (itemKey) {
            const item =
                text.match(new RegExp(`({[^{]*"id":[ ]?"${itemKey}"[^}]*})`)) ??
                [];
            string = string.replace(JSON.stringify(ref), item[0]);
        }
        string = string.replace(JSON.stringify(ref), text);
    }
    return JSON.parse(string);
};

export default resolveJSON;
