declare var FroalaEditor: any;
import * as shiki from 'shiki';
const CDN = 'https://unpkg.com/shiki/';

import * as svg from '../icon/ico.svg';

const { error } = console;

class IntegrationModel {
  private defaultLangList: shiki.Lang[];
  private highlighter: shiki.Highlighter | null;
  private defaultTheme: StringLiteralUnion<shiki.Theme>;

  constructor() {
    this.highlighter = null;
    this.defaultLangList = ['js', 'ruby'];
    this.defaultTheme = 'min-light';
    shiki.setCDN(CDN);
    this.createHighlighter();
  }

  public async createHighlighter(
    langs: shiki.Lang[] = this.defaultLangList,
    theme: StringLiteralUnion<shiki.Theme> = this.defaultTheme,
  ): Promise<void> {
    try {
      this.highlighter = await shiki.getHighlighter({ langs, theme });
    } catch (e: any) {
      error(`Can't create highlighter object - ${e}`);
    }
  }

  public codeToHtml(source: string, lang: StringLiteralUnion<shiki.Lang>): string {
    return this.highlighter?.codeToHtml(source, { lang }) || source;
  }
}

(function (FE) {
  const integrationModel = new IntegrationModel();

  FE.PLUGINS.syntaxHighlighter = function (editor: any) {
    function _init() {
      console.log('plugin initialized');
    }

    function highlight() {
      const selection = editor.selection.get();
      try {
        let html = integrationModel.codeToHtml(selection.toString(), 'ruby');
        html = editor.clean.html(html);
        editor.html.insert(html);
        editor.html.unwrap();
        editor.selection.restore();
      } catch (e: any) {
        error(e);
      }
    }

    return { highlight, _init };
  };

  FroalaEditor.DefineIconTemplate('highlightCodePlugin', '[SVG]');
  FroalaEditor.DefineIcon('highlightCode', { SVG: svg, template: 'highlightCodePlugin' });
  FE.RegisterCommand('highlightCode', {
    title: 'Highlight your code',
    undo: true,
    focus: false,
    callback: function () {
      this.syntaxHighlighter.highlight();
    },
  });
})(FroalaEditor);
