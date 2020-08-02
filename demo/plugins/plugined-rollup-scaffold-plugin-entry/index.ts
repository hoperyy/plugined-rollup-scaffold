// generate entries
export default class PluginEntry {
    constructor(options = {}) {
        this.options = { ...options };
    }

    options: object = {};

    context: object = {};

    async apply(context) {
        this.context = context;

        // context.srcFolder
        context.hooks.onRollupConfig.tap('configRollup', async () => {
            this.context.multiRollupConfigs = await this.generateOneRollup();
        });
    };

    async generateOneRollup() {
        const { ctx, utils } = this.context;
        const { root: srcFolder } = ctx;

        

        return [];
    };
}
