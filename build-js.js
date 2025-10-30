const {exec} = require('child_process');
const {renameSync, readFileSync, writeFileSync} = require('fs');

exec('tsc', () => {
    const js = 'dist/lib/tyme.js';
    const minJs = 'dist/lib/tyme.min.js';
    renameSync('dist/lib/index.js', js);
    const text = readFileSync(js, 'utf8');
    exec('terser ' + js + ' -c -o ' + minJs, () => {
        const minText = readFileSync(minJs, 'utf8');
        writeFileSync(js, text.replace('"use strict";', '"use strict";if (typeof exports === \'undefined\') { var exports = {};}'));
        writeFileSync(minJs, minText.replace('"use strict";', '"use strict";if(typeof exports===\'undefined\')var exports={};'));
        console.log('js build completed')
    });
});
