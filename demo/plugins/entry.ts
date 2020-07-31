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

        context.hooks.beforeEntry.tap('configEntry', () => {
            console.log('configEntry');
            // 返回 entry 列表
            return [];
        });
    }
}
