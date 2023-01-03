import resolveJSON from "../../components/resolve-json";
import ISettings from "./settings-interface";
import { SettingsModel } from "./settings-model";

export default async function GetSettings() {
    const request = await window.fetch(
        "https://raw.githubusercontent.com/klovaaxel/schedule-react/db/settings.json"
    );

    const response = request.ok ? await request.json() : null;
    const data: ISettings = (await resolveJSON(response)) ?? null;
    const settings: SettingsModel = new SettingsModel(data);

    return settings;
}
