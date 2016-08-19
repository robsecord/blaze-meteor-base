/**
 * Client-side Assets to be loaded from a CDN
 *   Public CDN Stats:
 *      https://www.cdnperf.com/#jsdelivr,cdnjs,google,yandex,microsoft,jquery,bootstrapcdn/https/90
 *      http://www.jsdelivr.com/statistics
 *
 *
 *  JS Assets are appended to the HEAD of the document, in the order they are listed.
 *
 *  CSS Assets are inserted according to their "insert" option into the HEAD of the document, in the order they are listed.
 *   - The "insert" option can be one of the following strings:
 *      "before" -- Inserts the CSS file BEFORE the "Meteor Generated Combined Stylesheet"
 *      "after" -- Inserts the CSS file AFTER the "Meteor Generated Combined Stylesheet"
 *
 * @type {{js: string[], css: *[]}}
 */
var assets = {
    js : [
        // Twitter Bootstrap
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',

        // Date/Time Picker for Bootstrap
        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/js/bootstrap-datetimepicker.min.js'
    ],

    css : [
        // Twitter Bootstrap
        {url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', 'insert': 'before'},

        // Date/Time Picker for Bootstrap
        {url: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/css/bootstrap-datetimepicker.min.css', 'insert': 'before'},

        // Font-Awesome
        {url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css', 'insert': 'after'},

        // Montserrat - Google Web Font
        {url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700', 'insert': 'after'}
    ]
};

/**
 * Load all Client-side Assets when the DOM is Ready
 */
Meteor.startup(function CDN_Assets_startup() {
    var i, n, asset;
    var head = document.getElementsByTagName('head')[0];
    var body = document.getElementsByTagName('body')[0];
    var link = head.getElementsByTagName('link')[0];

    // Add CSS Assets
    for (i = 0, n = assets.css.length; i < n; i++) {
        asset = document.createElement('link');
        asset.rel = 'stylesheet';
        asset.type = 'text/css';
        asset.href = assets.css[i].url;

        if (assets.css[i].insert === 'before') {
            head.insertBefore(asset, link);
        } else {
            if (link.nextSibling !== null) {
                head.insertBefore(asset, link.nextSibling);
            } else {
                head.appendChild(asset);
            }
        }
    }

    // Add JS Assets
    for (i = 0, n = assets.js.length; i < n; i++) {
        asset = document.createElement('script');
        asset.type = 'text/javascript';
        asset.src = assets.js[i];
        body.appendChild(asset);
    }
});
