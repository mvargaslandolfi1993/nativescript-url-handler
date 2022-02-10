"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const application = __importStar(require("@nativescript/core/application"));
const urlhandler_common_1 = require("./urlhandler.common");
var urlhandler_common_2 = require("./urlhandler.common");
exports.handleOpenURL = urlhandler_common_2.handleOpenURL;
function handleIntent(intent) {
    let data = intent.getData();
    try {
        let appURL = urlhandler_common_1.extractAppURL(data);
        if (appURL != null &&
            (new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_MAIN).valueOf()
                || new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf())) {
            try {
                setTimeout(() => {
                    let result = urlhandler_common_1.getCallback()(appURL);
                    intent.setAction('');
                    intent.setData(null);
                    return result;
                });
            }
            catch (ignored) {
                application.android.on(application.AndroidApplication.activityResultEvent, () => {
                    setTimeout(() => urlhandler_common_1.getCallback()(appURL));
                });
            }
        }
    }
    catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }
}
exports.handleIntent = handleIntent;
application.android.on(application.AndroidApplication.activityNewIntentEvent, (args) => {
    setTimeout(() => {
        let intent = args.activity.getIntent();
        try {
            handleIntent(intent);
        }
        catch (e) {
            console.error('Unknown error during getting App URL data', e);
        }
    });
});
//# sourceMappingURL=urlhandler.android.js.map