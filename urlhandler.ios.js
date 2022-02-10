"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlhandler_common_1 = require("./urlhandler.common");
const getappdelegate_1 = require("./getappdelegate");
var urlhandler_common_2 = require("./urlhandler.common");
exports.handleOpenURL = urlhandler_common_2.handleOpenURL;
exports.appDelegate = getappdelegate_1.getAppDelegate();
function enableMultipleOverridesFor(classRef, methodName, nextImplementation) {
    const currentImplementation = classRef.prototype[methodName];
    classRef.prototype[methodName] = function () {
        const result = currentImplementation && currentImplementation.apply(currentImplementation, Array.from(arguments));
        return nextImplementation.apply(nextImplementation, Array.from(arguments).concat([result]));
    };
}
enableMultipleOverridesFor(exports.appDelegate, 'applicationOpenURLOptions', function (url, options) {
    const lastArgument = arguments[arguments.length - 1];
    const previousResult = lastArgument !== options ? lastArgument : undefined;
    if (!previousResult) {
        let appURL = urlhandler_common_1.extractAppURL(url.absoluteString);
        if (appURL != null) {
            setTimeout(() => urlhandler_common_1.getCallback()(appURL));
        }
        return true;
    }
    return previousResult;
});
enableMultipleOverridesFor(exports.appDelegate, 'applicationContinueUserActivityRestorationHandler', function (userActivity) {
    if (userActivity.activityType === NSUserActivityTypeBrowsingWeb) {
        let appURL = urlhandler_common_1.extractAppURL(userActivity.webpageURL);
        if (appURL !== null) {
            setTimeout(() => urlhandler_common_1.getCallback()(appURL));
        }
    }
    return true;
});
//# sourceMappingURL=urlhandler.ios.js.map