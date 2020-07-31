import Base from './base/index';

import PluginEntry from './plugins/entry';

// get plugins
const plugins = [
    PluginEntry
];

new Base({
    plugins
});