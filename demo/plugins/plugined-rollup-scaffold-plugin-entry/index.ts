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
        context.hooks.onRollupConfig.tap('configRollup', () => {
            console.log('in plugin onRollupConfig', this.context.ctx.root);
            // 返回 entry 列表
            return [];
        });
    }
}
