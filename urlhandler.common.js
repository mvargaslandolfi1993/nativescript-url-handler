"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let URL_HANDLER_CB;
function extractAppURL(urlParam) {
    if (!!urlParam) {
        let url = urlParam.toString(), params = new Map(), urlWithPath = url.indexOf('//') < url.length - 2, urlWithParams = url.indexOf('?') !== -1, path = urlWithPath ? url.substring(url.indexOf('//') + 2, urlWithParams ? url.indexOf('?') : url.length) : null, parameters = url.substring(url.indexOf('?') + 1).split('&');
        if (urlWithParams) {
            for (let i = 0, len = parameters.length; i < len; i++) {
                let paramData = parameters[i].split('=');
                params.set(paramData[0], paramData[1] ? paramData[1] : null);
            }
        }
        return {
            params: params,
            path: path,
            toString: () => url
        };
    }
    else {
        return null;
    }
}
exports.extractAppURL = extractAppURL;
function handleOpenURL(handler) {
    URL_HANDLER_CB = handler;
}
exports.handleOpenURL = handleOpenURL;
function getCallback() {
    if (!URL_HANDLER_CB) {
        URL_HANDLER_CB = function () {
            console.error('No callback provided. Please ensure that you called "handleOpenURL" during application init!');
        };
    }
    return URL_HANDLER_CB;
}
exports.getCallback = getCallback;
//# sourceMappingURL=urlhandler.common.js.map