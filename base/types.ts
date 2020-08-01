
export interface options {
    root: string;
    configName: string;
    searchList: Array<string>;
}

export interface hooks {
    beforeEntry: object;
    afterEntry: object;
    beforeRollupConfig: object;
    afterRollupConfig: object;
    beforeRollupWrite: object;
    afterRollupWrite: object;
};

export interface userConfig {
    plugins?: Array<string | Array<any>>,
    presets?: Array<string | Array<any>>
}

export interface standardPluginPresetItem {
    absPath: string;
    options: object;
}

export interface utils {
    isArray(param: any): boolean;
    isString(param: any): boolean;
}