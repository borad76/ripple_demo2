// the app method accepts a fn to invoke on init unobtrusively 
var run = function(application) {
    if (navigator.userAgent.indexOf('Browzr') > -1) {
        // blackberry
        setTimeout(application, 250);
    } else {
        // attach to deviceready event, which is fired when phonegap is all good to go.
        x$(document).on('deviceready', application, false);
    }
}

// throw our settings into a lawnchair
, store = new Lawnchair({adaptor:'dom'})

// shows id passed
, display = function(id) {
    x$(routes).each(function(e, i) {
        x$(e).css({'display': e === id ? 'block' : 'none'})
    });
}

// keep track of registered selectors (for use in display)
, routes = []

// reg a click to [id]_button, displays id (if it exists) and executes callback (if it exists)
, when = function(id, callback) {
    routes.push(id);
    x$(id.replace(/^#/, '.') + '_button').on('touchstart', function () {
        if (x$(id).length > 0) {
            display(id);
            if (callback) {
                callback.call(this);
            }
        }
		return false;
    });
};
