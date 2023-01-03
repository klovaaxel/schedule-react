import ISettings from "./settings-interface";

export class SettingsModel {
    public schoolWeeks: number[];

    constructor(data: ISettings | null) {
        this.schoolWeeks = !!data && !!data.schoolWeeks ? data.schoolWeeks : [];
    }
}
