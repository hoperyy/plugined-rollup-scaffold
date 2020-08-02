interface typeEventInstance {
    tap(name: string, callback: Function): void;
    call(): void
}

export interface typeOptions {
    root: string;
    configName: string;
    searchList: Array<string>;
}

export interface typeHooks {
    beforeEntry: typeEventInstance;
    afterEntry: typeEventInstance;
    beforeRollupConfig: typeEventInstance;
    afterRollupConfig: typeEventInstance;
    beforeRollupWrite: typeEventInstance;
    afterRollupWrite: typeEventInstance;
};

export interface typeUserConfig {
    plugins?: Array<string | Array<any>>,
    presets?: Array<string | Array<any>>
}

export interface typeStandardPluginPresetItem {
    absPath: string;
    options: object;
}

export interface typeUtils {
    isArray(param: any): boolean;
    isString(param: any): boolean;
}

export interface typeRollupConfig {
    inputOptions: {
        input: string;
        external?: object;
        plugins?: Array<any>;
        onwarn?: Function;
        cache?: boolean;
        acorn?: any;
        context?: any;
        moduleContext?: any;
        legacy?: any;
    };
    outputOptions: {
        // core
        file?: any,   // 若有 bundle.write，必填
        format: any, // 必填
        name?: string,
        globals?: any,

        // 高级参数
        paths?: any,
        banner?: any,
        footer?: any,
        intro?: any,
        outro?: any,
        sourcemap?: any,
        sourcemapFile?: any,
        interop?: any,

        // 危险区域
        exports?: any,
        amd?: any,
        indent?: any
        strict?: any
    };
    watchOptions: {

    };
}

export interface typePluginContext {
    hooks: typeHooks;
    utils: typeUtils;
    rollup: typeRollupConfig;
}