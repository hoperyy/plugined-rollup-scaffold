import * as path from 'path';

// import * as gulp from 'gulp';
import { WaterfallEvents } from './events';
import { options, hooks, utils, userConfig, standardPluginPresetItem } from './types';

// generate entries

// build files inside packages

// build index.js
export default class Base {
    constructor(options: options) {
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

    public hooks: hooks;

    public utils: utils = {
        isArray(param: any): boolean {
            return Object.prototype.toString.call(param) === '[object Array]';
        },
        isString(param: any): boolean {
            return Object.prototype.toString.call(param) === '[object String]';
        }
    };

    private options: options;

    private getPluginConstructorList(): Array<FunctionConstructor> {
        const { root, configName } = this.options;
        const configFilePath: string = path.join(root, configName);

        const configObject: userConfig = require(configFilePath).default;
        const { plugins: pluginNames, presets: presetNames } = configObject;

        // search plugin/presets entries
        const standardPluginList: Array<standardPluginPresetItem> = pluginNames.map(name => this.findModule(name, 'plugin' ));
        const standardPresetList: Array<standardPluginPresetItem> = pluginNames.map(name => this.findModule(name, 'preset'));

        const pluginConstructors = [];

        return pluginConstructors;
    };

    private findModule(name: string | Array<any>, prefix: 'plugin' | 'preset'): standardPluginPresetItem {
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
        const pluginContext = {
            hooks: this.hooks,
            utils: this.utils
        };

        const plugins = this.getPluginConstructorList();

        for (let i = 0, len = plugins.length; i < len; i++) {
            const Plugin = plugins[i];
            const plugin = new Plugin();
            plugin.apply && await plugin.apply(pluginContext);
        }
    }

    private async runRoot() {
        await this.hooks.beforeEntry.call();
        await this.hooks.afterEntry.call();
        await this.hooks.beforeRollupConfig.call();
        await this.hooks.afterRollupConfig.call();
        await this.hooks.beforeRollupWrite.call();
        await this.hooks.afterRollupWrite.call();

        // run rollup
    }
}
