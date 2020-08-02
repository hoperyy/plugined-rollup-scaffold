import * as path from 'path';
import * as fs from 'fs';

import { typePluginContext } from '../../../core/types'; // TODO

export default class PluginEntry {
    constructor(options = {}) {
        this.options = { ...options };
    }

    options: object = {};

    context: typePluginContext;

    async apply(context: typePluginContext) {
        this.context = context;

        // context.srcFolder
        context.hooks.onRollupConfig.tap('configRollup', async () => {
            this.context.multiRollupConfigs = await this.generateOneRollup();
        });
    };

    async generateOneRollup() {
        const { ctx, utils } = this.context;
        const { root } = ctx;

        const packagesFolder: string = path.join(root, 'src/packages');
        const packagesNamelist = fs.readdirSync(packagesFolder).filter(name => fs.statSync(path.join(packagesFolder, name)).isDirectory());
        console.log(packagesNamelist);

        const promises = packagesNamelist.map(async packageName => {
            return {
                inputOptions: {
                    input: path.join(packagesFolder, packageName, 'index.js'),
                },
                outputOptions: {
                    file: path.join(packagesFolder, packageName, 'lib/index.js'),
                },
                watchOptions: {}
            };
        });

        return await Promise.all(promises);
    };
}
