declare var FroalaEditor: any;
import * as shiki from 'shiki';
import { detect, Lang, LANG } from 'program-language-detector';
import * as svg from '../icon/ico.svg';

const { error } = console;
type LangKey = keyof Lang;
const CDN = 'https://unpkg.com/shiki/';

const LangTypes = {
  ...LANG,
  [LANG['C++']]: 'c',
};

class IntegrationModel {
  private defaultLangList: shiki.Lang[];
  private loadedLanguages: shiki.Lang[];
  private highlighter: shiki.Highlighter | null;
  private defaultTheme: StringLiteralUnion<shiki.Theme>;

  constructor() {
    this.highlighter = null;
    this.defaultLangList = ['js', 'ruby', 'c', 'css', 'html', 'python'];
    this.loadedLanguages = [];
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
      this.loadedLanguages = langs;
    } catch (e: any) {
      error(`Can't create highlighter object - ${e}`);
    }
  }

  public async codeToHtml(source: string, lang: shiki.Lang): Promise<string> {
    if (!this.loadedLanguages.includes(lang)) {
      await this.highlighter?.loadLanguage(lang);
      this.loadedLanguages.push(lang);
    }
    return `${this.highlighter?.codeToHtml(source, { lang })}<p></p>` || source;
  }

  public cleanEmpty(froalaEl: HTMLDivElement): void {
    const shikiEls = froalaEl.querySelectorAll('.shiki');

    for (const el of shikiEls) {
      if (!el.textContent?.trim().replace(/[\u200B-\u200D\uFEFF]/g, '').length) {
        el.remove();
      } else {
        const codeEls = el.querySelectorAll('code');

        for (const codeEl of codeEls) {
          if (!codeEl.textContent?.trim().replace(/[\u200B-\u200D\uFEFF]/g, '').length) {
            codeEl.remove();
          }
        }
      }
    }
  }
}

(function (FE) {
  const integrationModel = new IntegrationModel();


  FE.PLUGINS.syntaxHighlighter = function (editor: any) {
    function _init() {

    }

    async function highlight(): Promise<void> {
      try {
        const selection = editor.selection.get().toString();
        const detectedLang: LangKey = detect(selection) as LangKey;
        const lang = LangTypes[detectedLang as LangKey].toLowerCase();
        if (lang === LangTypes.Unknown.toLowerCase()) {
          return;
        }
        let html = await integrationModel.codeToHtml(selection, lang as shiki.Lang);
        html = editor.clean.html(html);
        editor.html.insert(html);
        editor.html.unwrap();
        editor.selection.restore();
        const [froalaEl] = editor.$el.get();
        integrationModel.cleanEmpty(froalaEl);
      } catch (e: any) {
        error(e);
      }
    }

    return { highlight, _init };
  };

  FE.DefineIconTemplate('highlightCodePlugin', '[SVG]');
  FE.DefineIcon('highlightCode', { SVG: svg, template: 'highlightCodePlugin' });
  FE.RegisterCommand('highlightCode', {
    title: 'Highlight your code',
    undo: true,
    focus: false,
    callback: function() {
      this.syntaxHighlighter.highlight();
    },
  });
  FE.RegisterShortcut(70, 'highlightCode', 'F', 'F', false);
})(FroalaEditor);
