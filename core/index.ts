import * as path from 'path';

// import * as gulp from 'gulp';
import { WaterfallEvents } from './events';
import { typeOptions, typeHooks, typeUtils, typeUserConfig, typeStandardPluginPresetItem, typeRollupConfig, typePluginContext } from './types';

// generate entries

// build files inside packages

// build index.js
export default class Core {
    constructor(options: typeOptions) {
        this.options = { ...options };
        
        this.hooks = {
            beforeEntry: new WaterfallEvents(),
            afterEntry: new WaterfallEvents(),
            beforeRollupConfig: new WaterfallEvents(),
            afterRollupConfig: new WaterfallEvents(),
            beforeRollupWrite: new WaterfallEvents(),
            afterRollupWrite: new WaterfallEvents(),
        };

        (async () => {
            await this.installPlugins();
            await this.runRoot();
        })();
    }

    public hooks: typeHooks;

    public utils: typeUtils = {
        isArray(param: any): boolean {
            return Object.prototype.toString.call(param) === '[object Array]';
        },
        isString(param: any): boolean {
            return Object.prototype.toString.call(param) === '[object String]';
        }
    };

    public rollup: typeRollupConfig;

    private options: typeOptions;

    private getPluginConstructorList(): Array<FunctionConstructor> {
        const { root, configName } = this.options;
        const configFilePath: string = path.join(root, configName);

        const configObject: typeUserConfig = require(configFilePath).default;
        const { plugins: pluginNames, presets: presetNames } = configObject;

        // search plugin/presets entries
        const standardPluginList: Array<typeStandardPluginPresetItem> = pluginNames.map(name => this.findModule(name, 'plugin' ));
        const standardPresetList: Array<typeStandardPluginPresetItem> = pluginNames.map(name => this.findModule(name, 'preset'));

        const pluginConstructors = [];

        return pluginConstructors;
    };

    private findModule(name: string | Array<any>, prefix: 'plugin' | 'preset'): typeStandardPluginPresetItem {
        const standardItem = {
            absPath: '',
            options: {}
        };

        if (this.utils.isString(name)) {

        } else if (this.utils.isArray(name)) {

        }

        return standardItem;
    }

    private async installPlugins() {
        const pluginContext: typePluginContext = {
            hooks: this.hooks,
            utils: this.utils,
            rollup: this.rollup,
        };

        const plugins: Array<FunctionConstructor> = this.getPluginConstructorList();

        for (let i = 0, len = plugins.length; i < len; i++) {
            const Plugin = plugins[i];
            const plugin = new Plugin();
            plugin.apply && await plugin.apply(pluginContext);
        }
    }

    private async runRoot() {
        // config rollup
        await this.hooks.beforeEntry.call();
        await this.hooks.afterEntry.call();
        await this.hooks.beforeRollupConfig.call();
        await this.hooks.afterRollupConfig.call();
        await this.hooks.beforeRollupWrite.call();
        await this.hooks.afterRollupWrite.call();

        // run rollup
    }
}
