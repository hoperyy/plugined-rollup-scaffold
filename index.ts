
import * as path from 'path';
import Base from './base/index';

new Base({
    root: path.join(__dirname, 'demo'),
    configName: 'scaffold.config.js',
    searchList: [
        'node_modules',
        'plugins'
    ],
});