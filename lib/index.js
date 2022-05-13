"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const shiki = require("shiki");
require("../icon/index.css");
const CDN = 'https://unpkg.com/shiki/';
const { error } = console;
class IntegrationModel {
    constructor() {
        this.highlighter = null;
        this.defaultLangList = ['js'];
        this.defaultTheme = 'min-light';
        shiki.setCDN(CDN);
        this.createHighlighter();
    }
    createHighlighter(langs = this.defaultLangList, theme = this.defaultTheme) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.highlighter = yield shiki.getHighlighter({ langs, theme });
            }
            catch (e) {
                error(`Can't create highlighter object - ${e}`);
            }
        });
    }
    codeToHtml(source, lang) {
        var _a;
        return ((_a = this.highlighter) === null || _a === void 0 ? void 0 : _a.codeToHtml(source, { lang })) || source;
    }
}
(function (FE) {
    const integrationModel = new IntegrationModel();
    FE.PLUGINS.syntaxHighlighter = function (editor) {
        function _init() {
            console.log('plugin initialized');
        }
        function highlight() {
            const selection = editor.selection.get();
            try {
                let html = integrationModel.codeToHtml(selection.toString(), 'js');
                html = editor.clean.html(html);
                editor.html.insert(html);
                editor.html.unwrap();
                editor.selection.restore();
            }
            catch (e) {
                error(e);
            }
        }
        return { highlight, _init };
    };
    FroalaEditor.DefineIconTemplate('highlightCodePlugin', '<i style="background: url("../icon/ico.svg")" class="icon icon-[NAME]"></i>');
    FroalaEditor.DefineIcon('highlightCode', { NAME: 'highlight-code', template: 'highlightCodePlugin' });
    FE.RegisterCommand('highlightCode', {
        title: 'Highlight your code',
        undo: true,
        focus: false,
        callback: function () {
            this.syntaxHighlighter.highlight();
        },
    });
})(FroalaEditor);
