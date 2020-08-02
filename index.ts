
import * as path from 'path';
import Core from './core/index';

new Core({
    root: path.join(__dirname, 'demo'),
    searchList: [
        'node_modules',
        'plugins'
    ],
    mode: 'multi-rollup',
    plugins: [
        ['entry', { a: 1 }]
    ],
    presets: [

    ]
});