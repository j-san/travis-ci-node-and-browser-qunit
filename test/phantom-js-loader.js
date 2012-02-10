var fs = require('fs'),
    page = new WebPage(),
    file = fs.absolute('test/index.html');

page.onConsoleMessage = function(msg) {
    console.log(msg);
    if (/^Tests completed in/.test(msg)) {
        phantom.exit(page.evaluate(function () {
            return QUnit.config.stats.bad || 0;
        }));
    }
};

page.open('file://' + file, function (status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
        phantom.exit(1);
    }
});