
import * as path from 'path';
import Core from './core/index';

new Core({
    root: path.join(__dirname, 'demo'),
    configName: 'scaffold.config.js',
    searchList: [
        'node_modules',
        'plugins'
    ],
    mode: 'multi-rollup'
});