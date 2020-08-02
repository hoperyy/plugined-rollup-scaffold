import * as path from 'path';
import * as fs from 'fs';
import * as rollup from 'rollup';

// import * as gulp from 'gulp';
import { WaterfallEvents } from './events';
import { typeOptions, typeUtils, typeStandardPluginPresetInputItem, typePluginContext, typeStandardPluginPresetOutputItem } from './types';

// generate entries

// build files inside packages

// build index.js
export default class Core {
    constructor(options: typeOptions = {}) {
        this.options = { ...this.options, ...options };

        if (!this.options.root) {
            console.log(`[plugined-rollup-scaffold] config "root: string" is needed.`);
            return;
        }

        // update pluginContext
        Object.assign(this.pluginContext.ctx, {
            root: this.options.root
        });

        (async () => {
            await this.installPlugins();
            await this.runRoot();
        })();
    }

    public pluginContext: typePluginContext = {
        hooks: {
            onRollupConfig: new WaterfallEvents(),
            afterRollupConfig: new WaterfallEvents(),
        },
        utils: {
            isArray(param: any): boolean {
                return Object.prototype.toString.call(param) === '[object Array]';
            },
            isString(param: any): boolean {
                return Object.prototype.toString.call(param) === '[object String]';
            }
        },
        ctx: {
            root: '',
        },
        singleRollupConfig: {
            inputOptions: {},
            outputOptions: {},
            watchOptions: {}
        },
        multiRollupConfigs: [],
    }

    public utils: typeUtils = {
        isArray(param: any): boolean {
            return Object.prototype.toString.call(param) === '[object Array]';
        },
        isString(param: any): boolean {
            return Object.prototype.toString.call(param) === '[object String]';
        }
    };

    private options: typeOptions = {
        root: '',
        searchList: [ 'node_modules' ],
        mode: 'single-rollup',
        plugins: [],
        presets: []
    };

    private getPluginList(): Array<typeStandardPluginPresetOutputItem> {
        const { plugins: pluginNames, presets: presetNames } = this.options;

        // search plugin/presets entries
        const standardPluginList: Array<typeStandardPluginPresetInputItem> = pluginNames.map(name => this.findModule(name, 'plugin' )).filter(item => !!item);
        const standardPresetList: Array<typeStandardPluginPresetInputItem> = pluginNames.map(name => this.findModule(name, 'preset')).filter(item => !!item);

        const pluginConstructors = standardPluginList.map(({ modulePath, options }) => {
            const Fn = require(modulePath).default;

            return {
                Fn,
                options,
            };
        });

        return pluginConstructors;
    };

    private findModule(input: string | Array<any>, tag: 'plugin' | 'preset'): typeStandardPluginPresetInputItem {
        let standardOutput = null;

        // format input
        let standardInput = null;

        if (this.utils.isString(input)) {
            standardInput = {
                name: input as string,
                options: {}
            };
        } else if (this.utils.isArray(input)) {
            standardInput = {
                name: input[0],
                options: input[1] || {}
            };
        }

        if (!standardInput) {
            return null;
        }

        const prefix = `plugined-rollup-scaffold-${tag}-`;

        for (let i = 0, len = this.options.searchList.length; i < len; i++) {
            const curSearchPath: string = path.join(this.options.root, this.options.searchList[i]);
            const moduleName: string = standardInput.name.indexOf(prefix) === -1 ? `${prefix}${standardInput.name}` : standardInput.name;
            const modulePath: string = path.join(curSearchPath, moduleName, 'index.js');
            
            if (fs.existsSync(modulePath)) {
                standardOutput = {
                    modulePath,
                    options: standardInput.options,
                }

                break;
            }
        }

        // console.log(standardOutput);

        return standardOutput;
    }

    private async installPlugins() {
        const plugins: Array<typeStandardPluginPresetOutputItem> = this.getPluginList();

        const promises = plugins.map(async ( { Fn, options } ) => {
            const plugin = new Fn(options);
            plugin.apply && await plugin.apply(this.pluginContext);
        });

        await Promise.all(promises);
    }

    private async runRoot() {
        // config rollup
        await this.pluginContext.hooks.onRollupConfig.call();
        await this.pluginContext.hooks.afterRollupConfig.call();

        // run rollup
        await this.runRollup();
    }

    private async runRollup() {
        const pluginContext = this.pluginContext;

        switch (this.options.mode) {
            case 'single-rollup':
                {
                    // create a bundle
                    const bundle = await rollup.rollup(pluginContext.singleRollupConfig.inputOptions);
                    // or write the bundle to disk
                    await bundle.write(pluginContext.singleRollupConfig.outputOptions);
                }
                break;
            case 'multi-rollup':
                {
                    const promises = pluginContext.multiRollupConfigs.map(async curRollupConfig => {
                        // create a bundle
                        const bundle = await rollup.rollup(curRollupConfig.inputOptions);
                        // or write the bundle to disk
                        await bundle.write(curRollupConfig.outputOptions);
                    });

                    await Promise.all(promises);
                }
                break;
            default:
                break;
        }
    }
}
