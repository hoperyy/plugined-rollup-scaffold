interface typeEventInstance {
    tap(name: string, callback: Function): void;
    call(): void
}

export interface typeOptions {
    root?: string;
    searchList?: Array<string>;
    mode?: 'single-rollup' | 'multi-rollup';
    plugins?: Array<string | Array<any>>;
    presets?: Array<string | Array<any>>;
}

export interface typeHooks {
    onRollupConfig: typeEventInstance;
    afterRollupConfig: typeEventInstance;
};

export interface typeUserConfig {
    plugins?: Array<string | Array<any>>,
    presets?: Array<string | Array<any>>
}

export interface typeStandardPluginPresetInputItem {
    modulePath: string;
    options: object;
}

export interface typeUtils {
    isArray(param: any): boolean;
    isString(param: any): boolean;
}

export interface typeRollupConfig {
    inputOptions: {
        input?: any;
        external?: any;
        plugins?: Array<any>;
        onwarn?: any;
        cache?: any;
        acorn?: any;
        context?: any;
        moduleContext?: any;
        legacy?: any;
    };
    outputOptions: {
        // core
        file?: any,   // 若有 bundle.write，必填
        format?: any, // 必填
        name?: any,
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
    watchOptions?: {

    };
}

export interface typePluginContext {
    hooks: typeHooks;
    utils: typeUtils;
    ctx: {
        root: string
    },
    singleRollupConfig?: typeRollupConfig;
    multiRollupConfigs?: Array<typeRollupConfig>;
}

export interface typeStandardPluginPresetOutputItem {
    Fn(options: object): void;
    options: object;
}