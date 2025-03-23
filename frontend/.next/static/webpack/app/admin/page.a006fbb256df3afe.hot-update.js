"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/admin/page",{

/***/ "(app-pages-browser)/./src/app/admin/MessagesList.tsx":
/*!****************************************!*\
  !*** ./src/app/admin/MessagesList.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MessagesList: function() { return /* binding */ MessagesList; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ MessagesList auto */ \nvar _s = $RefreshSig$();\n\nconst MessagesList = ()=>{\n    _s();\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [selectedMessage, setSelectedMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchMessages = async ()=>{\n            try {\n                const res = await fetch(\"http://localhost:5000/messages\");\n                if (!res.ok) throw new Error(\"Kunde inte h\\xe4mta meddelanden.\");\n                const data = await res.json();\n                // Sortera meddelandena så att nyaste ligger först\n                const sortedMessages = data.sort((a, b)=>{\n                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();\n                });\n                setMessages(sortedMessages);\n            } catch (err) {\n                setError(err.message);\n            } finally{\n                setLoading(false);\n            }\n        };\n        fetchMessages();\n    }, []);\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: \"⏳ Laddar meddelanden...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n        lineNumber: 42,\n        columnNumber: 23\n    }, undefined);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        className: \"text-red-600\",\n        children: error\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n        lineNumber: 43,\n        columnNumber: 21\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"space-y-4\",\n        children: selectedMessage ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"border p-4 rounded shadow\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                    className: \"font-semibold text-lg\",\n                    children: selectedMessage.senderName\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                    lineNumber: 49,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-sm text-gray-600\",\n                    children: selectedMessage.senderEmail\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-gray-800\",\n                    children: selectedMessage.message\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                    lineNumber: 51,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-sm text-gray-500\",\n                    children: new Date(selectedMessage.createdAt).toLocaleString()\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                    lineNumber: 52,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mt-4 flex space-x-4\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600\",\n                            onClick: ()=>window.location.href = \"mailto:\".concat(selectedMessage.senderEmail),\n                            children: \"Svara\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                            lineNumber: 56,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"px-4 py-2 bg-gray-300 rounded hover:bg-gray-400\",\n                            onClick: ()=>setSelectedMessage(null),\n                            children: \"St\\xe4ng\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                            lineNumber: 64,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                    lineNumber: 55,\n                    columnNumber: 11\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n            lineNumber: 48,\n            columnNumber: 9\n        }, undefined) : messages.map((message)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"border p-4 rounded shadow hover:bg-gray-100 cursor-pointer\",\n                onClick: ()=>setSelectedMessage(message),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"font-semibold\",\n                        children: message.senderName\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                        lineNumber: 79,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-sm text-gray-600\",\n                        children: message.senderEmail\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                        lineNumber: 80,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-gray-800\",\n                        children: message.message\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                        lineNumber: 81,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-sm text-gray-500\",\n                        children: new Date(message.createdAt).toLocaleString()\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                        lineNumber: 82,\n                        columnNumber: 13\n                    }, undefined)\n                ]\n            }, message._id, true, {\n                fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n                lineNumber: 74,\n                columnNumber: 11\n            }, undefined))\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\engst\\\\portfolio\\\\frontend\\\\src\\\\app\\\\admin\\\\MessagesList.tsx\",\n        lineNumber: 46,\n        columnNumber: 5\n    }, undefined);\n};\n_s(MessagesList, \"cy6aIqH5ylhqQQwUnbHhCP+SbF4=\");\n_c = MessagesList;\nvar _c;\n$RefreshReg$(_c, \"MessagesList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvYWRtaW4vTWVzc2FnZXNMaXN0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFNEM7QUFVckMsTUFBTUUsZUFBZTs7SUFDMUIsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdILCtDQUFRQSxDQUFZLEVBQUU7SUFDdEQsTUFBTSxDQUFDSSxpQkFBaUJDLG1CQUFtQixHQUFHTCwrQ0FBUUEsQ0FBaUI7SUFDdkUsTUFBTSxDQUFDTSxTQUFTQyxXQUFXLEdBQUdQLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ1EsT0FBT0MsU0FBUyxHQUFHVCwrQ0FBUUEsQ0FBZ0I7SUFFbERELGdEQUFTQSxDQUFDO1FBQ1IsTUFBTVcsZ0JBQWdCO1lBQ3BCLElBQUk7Z0JBQ0YsTUFBTUMsTUFBTSxNQUFNQyxNQUFNO2dCQUN4QixJQUFJLENBQUNELElBQUlFLEVBQUUsRUFBRSxNQUFNLElBQUlDLE1BQU07Z0JBQzdCLE1BQU1DLE9BQWtCLE1BQU1KLElBQUlLLElBQUk7Z0JBRXRDLGtEQUFrRDtnQkFDbEQsTUFBTUMsaUJBQWlCRixLQUFLRyxJQUFJLENBQUMsQ0FBQ0MsR0FBR0M7b0JBQ25DLE9BQU8sSUFBSUMsS0FBS0QsRUFBRUUsU0FBUyxFQUFFQyxPQUFPLEtBQUssSUFBSUYsS0FBS0YsRUFBRUcsU0FBUyxFQUFFQyxPQUFPO2dCQUN4RTtnQkFFQXBCLFlBQVljO1lBQ2QsRUFBRSxPQUFPTyxLQUFVO2dCQUNqQmYsU0FBU2UsSUFBSUMsT0FBTztZQUN0QixTQUFVO2dCQUNSbEIsV0FBVztZQUNiO1FBQ0Y7UUFFQUc7SUFDRixHQUFHLEVBQUU7SUFFTCxJQUFJSixTQUFTLHFCQUFPLDhEQUFDb0I7a0JBQUU7Ozs7OztJQUN2QixJQUFJbEIsT0FBTyxxQkFBTyw4REFBQ2tCO1FBQUVDLFdBQVU7a0JBQWdCbkI7Ozs7OztJQUUvQyxxQkFDRSw4REFBQ29CO1FBQUlELFdBQVU7a0JBQ1p2QixnQ0FDQyw4REFBQ3dCO1lBQUlELFdBQVU7OzhCQUNiLDhEQUFDRTtvQkFBR0YsV0FBVTs4QkFBeUJ2QixnQkFBZ0IwQixVQUFVOzs7Ozs7OEJBQ2pFLDhEQUFDSjtvQkFBRUMsV0FBVTs4QkFBeUJ2QixnQkFBZ0IyQixXQUFXOzs7Ozs7OEJBQ2pFLDhEQUFDTDtvQkFBRUMsV0FBVTs4QkFBaUJ2QixnQkFBZ0JxQixPQUFPOzs7Ozs7OEJBQ3JELDhEQUFDQztvQkFBRUMsV0FBVTs4QkFDVixJQUFJTixLQUFLakIsZ0JBQWdCa0IsU0FBUyxFQUFFVSxjQUFjOzs7Ozs7OEJBRXJELDhEQUFDSjtvQkFBSUQsV0FBVTs7c0NBQ2IsOERBQUNNOzRCQUNDTixXQUFVOzRCQUNWTyxTQUFTLElBQ1BDLE9BQU9DLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHLFVBQXNDLE9BQTVCakMsZ0JBQWdCMkIsV0FBVztzQ0FFL0Q7Ozs7OztzQ0FHRCw4REFBQ0U7NEJBQ0NOLFdBQVU7NEJBQ1ZPLFNBQVMsSUFBTTdCLG1CQUFtQjtzQ0FDbkM7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQU1MSCxTQUFTb0MsR0FBRyxDQUFDLENBQUNiLHdCQUNaLDhEQUFDRztnQkFFQ0QsV0FBVTtnQkFDVk8sU0FBUyxJQUFNN0IsbUJBQW1Cb0I7O2tDQUVsQyw4REFBQ0M7d0JBQUVDLFdBQVU7a0NBQWlCRixRQUFRSyxVQUFVOzs7Ozs7a0NBQ2hELDhEQUFDSjt3QkFBRUMsV0FBVTtrQ0FBeUJGLFFBQVFNLFdBQVc7Ozs7OztrQ0FDekQsOERBQUNMO3dCQUFFQyxXQUFVO2tDQUFpQkYsUUFBUUEsT0FBTzs7Ozs7O2tDQUM3Qyw4REFBQ0M7d0JBQUVDLFdBQVU7a0NBQ1YsSUFBSU4sS0FBS0ksUUFBUUgsU0FBUyxFQUFFVSxjQUFjOzs7Ozs7O2VBUnhDUCxRQUFRYyxHQUFHOzs7Ozs7Ozs7O0FBZTVCLEVBQUU7R0E3RVd0QztLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2FkbWluL01lc3NhZ2VzTGlzdC50c3g/MjFjNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmludGVyZmFjZSBNZXNzYWdlIHtcclxuICBfaWQ6IHN0cmluZztcclxuICBzZW5kZXJOYW1lOiBzdHJpbmc7XHJcbiAgc2VuZGVyRW1haWw6IHN0cmluZztcclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBNZXNzYWdlc0xpc3QgPSAoKSA9PiB7XHJcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZTxNZXNzYWdlW10+KFtdKTtcclxuICBjb25zdCBbc2VsZWN0ZWRNZXNzYWdlLCBzZXRTZWxlY3RlZE1lc3NhZ2VdID0gdXNlU3RhdGU8TWVzc2FnZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaE1lc3NhZ2VzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL21lc3NhZ2VzXCIpO1xyXG4gICAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJLdW5kZSBpbnRlIGjDpG10YSBtZWRkZWxhbmRlbi5cIik7XHJcbiAgICAgICAgY29uc3QgZGF0YTogTWVzc2FnZVtdID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICBcclxuICAgICAgICAvLyBTb3J0ZXJhIG1lZGRlbGFuZGVuYSBzw6UgYXR0IG55YXN0ZSBsaWdnZXIgZsO2cnN0XHJcbiAgICAgICAgY29uc3Qgc29ydGVkTWVzc2FnZXMgPSBkYXRhLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShiLmNyZWF0ZWRBdCkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYS5jcmVhdGVkQXQpLmdldFRpbWUoKTtcclxuICAgICAgICB9KTtcclxuICBcclxuICAgICAgICBzZXRNZXNzYWdlcyhzb3J0ZWRNZXNzYWdlcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgICAgc2V0RXJyb3IoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIFxyXG4gICAgZmV0Y2hNZXNzYWdlcygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgaWYgKGxvYWRpbmcpIHJldHVybiA8cD7ij7MgTGFkZGFyIG1lZGRlbGFuZGVuLi4uPC9wPjtcclxuICBpZiAoZXJyb3IpIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC02MDBcIj57ZXJyb3J9PC9wPjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIHtzZWxlY3RlZE1lc3NhZ2UgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgcC00IHJvdW5kZWQgc2hhZG93XCI+XHJcbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWxnXCI+e3NlbGVjdGVkTWVzc2FnZS5zZW5kZXJOYW1lfTwvaDM+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj57c2VsZWN0ZWRNZXNzYWdlLnNlbmRlckVtYWlsfTwvcD5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS04MDBcIj57c2VsZWN0ZWRNZXNzYWdlLm1lc3NhZ2V9PC9wPlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNTAwXCI+XHJcbiAgICAgICAgICAgIHtuZXcgRGF0ZShzZWxlY3RlZE1lc3NhZ2UuY3JlYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfVxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGZsZXggc3BhY2UteC00XCI+XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgYmctYmx1ZS01MDAgdGV4dC13aGl0ZSByb3VuZGVkIGhvdmVyOmJnLWJsdWUtNjAwXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgbWFpbHRvOiR7c2VsZWN0ZWRNZXNzYWdlLnNlbmRlckVtYWlsfWBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBTdmFyYVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1ncmF5LTMwMCByb3VuZGVkIGhvdmVyOmJnLWdyYXktNDAwXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZE1lc3NhZ2UobnVsbCl9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBTdMOkbmdcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IChcclxuICAgICAgICBtZXNzYWdlcy5tYXAoKG1lc3NhZ2UpID0+IChcclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAga2V5PXttZXNzYWdlLl9pZH1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYm9yZGVyIHAtNCByb3VuZGVkIHNoYWRvdyBob3ZlcjpiZy1ncmF5LTEwMCBjdXJzb3ItcG9pbnRlclwiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkTWVzc2FnZShtZXNzYWdlKX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPnttZXNzYWdlLnNlbmRlck5hbWV9PC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj57bWVzc2FnZS5zZW5kZXJFbWFpbH08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS04MDBcIj57bWVzc2FnZS5tZXNzYWdlfTwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNTAwXCI+XHJcbiAgICAgICAgICAgICAge25ldyBEYXRlKG1lc3NhZ2UuY3JlYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApKVxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTWVzc2FnZXNMaXN0IiwibWVzc2FnZXMiLCJzZXRNZXNzYWdlcyIsInNlbGVjdGVkTWVzc2FnZSIsInNldFNlbGVjdGVkTWVzc2FnZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsImZldGNoTWVzc2FnZXMiLCJyZXMiLCJmZXRjaCIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsInNvcnRlZE1lc3NhZ2VzIiwic29ydCIsImEiLCJiIiwiRGF0ZSIsImNyZWF0ZWRBdCIsImdldFRpbWUiLCJlcnIiLCJtZXNzYWdlIiwicCIsImNsYXNzTmFtZSIsImRpdiIsImgzIiwic2VuZGVyTmFtZSIsInNlbmRlckVtYWlsIiwidG9Mb2NhbGVTdHJpbmciLCJidXR0b24iLCJvbkNsaWNrIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibWFwIiwiX2lkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/admin/MessagesList.tsx\n"));

/***/ })

});