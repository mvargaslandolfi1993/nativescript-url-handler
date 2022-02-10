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
function getAppDelegate() {
    if (application.ios.delegate === undefined) {
        class UIApplicationDelegateImpl extends UIResponder {
            static new() {
                return super.new();
            }
        }
        UIApplicationDelegateImpl.ObjCProtocols = [UIApplicationDelegate];
        application.ios.delegate = UIApplicationDelegateImpl;
    }
    return application.ios.delegate;
}
exports.getAppDelegate = getAppDelegate;
//# sourceMappingURL=getappdelegate.js.map