import Base from './base/index';

import userConfig from './demo/scaffold.config'

// get plugins
const plugins = userConfig.plugins;

new Base({
    plugins
});