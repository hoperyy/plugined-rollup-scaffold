
export interface options {
    root: string;
    configName: string;
    searchList: Array<string>;
}

export interface hooks {
    beforeEntry: eventInstance;
    afterEntry: eventInstance;
    beforeRollupConfig: eventInstance;
    afterRollupConfig: eventInstance;
    beforeRollupWrite: eventInstance;
    afterRollupWrite: eventInstance;
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

export interface eventInstance {
    tap(name: string, callback: Function): void;
    call(): void
}