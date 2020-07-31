// import * as gulp from 'gulp';
import { WaterfallEvents } from './events';

// generate entries

// build files inside packages

// build index.js

export default class Base {
    constructor(options = {}) {
        (async () => {
            this.plugins = options.plugins || [];

            this.hooks = {
                beforeEntry: new WaterfallEvents(),
                afterEntry: new WaterfallEvents(),
                beforeRollupConfig: new WaterfallEvents(),
                afterRollupConfig: new WaterfallEvents(),
                beforeRollupWrite: new WaterfallEvents(),
                afterRollupWrite: new WaterfallEvents(),
            };

            // run plugin list
            await this.installPlugins();

            await this.runRoot();
        })();
    }

    hooks: object = {};

    plugins: [];

    async installPlugins() {
        for (let i = 0, len = this.plugins.length; i < len; i++) {
            const Plugin = this.plugins[i];
            const plugin = new Plugin();
            plugin.apply && await plugin.apply(this);
        }
    }

    async runRoot() {
        await this.hooks.beforeEntry.call();
        await this.hooks.afterEntry.call();
        await this.hooks.beforeRollupConfig.call();
        await this.hooks.afterRollupConfig.call();
        await this.hooks.beforeRollupWrite.call();
        await this.hooks.afterRollupWrite.call();
    }
}
