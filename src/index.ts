import { detect, Lang, LANG } from 'program-language-detector';
import * as shiki from 'shiki';
import * as svg from '../icon/ico.svg';

namespace FroalaCodeHighlighter {
  type LangKey = keyof Lang;

  const CDN_URL = 'https://unpkg.com/shiki/';
  const DEFAULT_LANG_LIST: shiki.Lang[] = ['js', 'ruby', 'c', 'css', 'html', 'python'];
  const LANG_TYPES = {
    ...LANG,
    [LANG['C++']]: 'c',
  };
  const { error } = console;
  const REG_EXP = /[\u200B-\u200D\uFEFF]/g;

  export class IntegrationModel implements Integration {
    private readonly defaultLangList: ReadonlyArray<shiki.Lang>;
    private readonly defaultTheme: StringLiteralUnion<shiki.Theme>;
    private loadedLanguages: shiki.Lang[];
    private highlighter: shiki.Highlighter | null;

    constructor() {
      this.highlighter = null;
      this.defaultLangList = DEFAULT_LANG_LIST;
      this.loadedLanguages = [];
      this.defaultTheme = 'min-light';
      shiki.setCDN(CDN_URL);
      this.createHighlighter();
    }

    public cleanEmpty(froalaEl: Element): void {
      const shikiEls = froalaEl.querySelectorAll('.shiki');

      for (const el of shikiEls) {
        if (!el.textContent?.trim().replace(REG_EXP, '').length) {
          el.remove();
        } else {
          const codeEls = el.querySelectorAll('code');

          for (const codeEl of codeEls) {
            if (!codeEl.textContent?.trim().replace(REG_EXP, '').length) {
              codeEl.remove();
            }
          }
        }
      }
    }

    public async codeToHtml(source: string, lang: shiki.Lang): Promise<string> {
      if (!this.loadedLanguages.includes(lang)) {
        await this.highlighter?.loadLanguage(lang);
        this.loadedLanguages.push(lang);
      }
      return `${this.highlighter?.codeToHtml(source, { lang })}<p></p>` || source;
    }

    public async createHighlighter(
      langs: shiki.Lang[] = [...this.defaultLangList],
      theme: StringLiteralUnion<shiki.Theme> = this.defaultTheme,
    ): Promise<void> {
      try {
        this.highlighter = await shiki.getHighlighter({ langs, theme });
        this.loadedLanguages = langs;
      } catch (e: any) {
        error(`Can't create highlighter object - ${e}`);
      }
    }
  }

  export class SyntaxHighlighter implements Highlighter {
    private integrationModel: IntegrationModel;
    constructor(protected readonly fe: FroalaEditor) {
      this.integrationModel = new IntegrationModel();
      this.createPlugin();
    }

    public createPlugin(): void {
      const { integrationModel } = this;
      this.fe.PLUGINS.syntaxHighlighter = function ({ clean, html, selection, $el }: EditorObject) {
        return {
          _init: () => {},
          highlight: async () => {
            try {
              const content: string = selection.get().toString();
              const detectedLang: LangKey = detect(content) as LangKey;
              const lang = LANG_TYPES[detectedLang as LangKey].toLowerCase();
              if (lang === LANG_TYPES.Unknown.toLowerCase()) {
                return;
              }

              let htmlContent = await integrationModel.codeToHtml(content, lang as shiki.Lang);
              htmlContent = clean.html(htmlContent);
              html.insert(htmlContent);
              html.unwrap();
              selection.restore();
              const [froalaEl] = $el.get();
              integrationModel.cleanEmpty(froalaEl);
            } catch (e: any) {
              error(e);
            }
          },
          createHighlighter: async (langs: shiki.Lang[], theme: StringLiteralUnion<shiki.Theme>) => {
            await integrationModel.createHighlighter(langs, theme);
          },
        };
      };
      this.fe.DefineIconTemplate('highlightCodePlugin', '[SVG]');
      this.fe.DefineIcon('highlightCode', { SVG: svg, template: 'highlightCodePlugin' });
      this.fe.RegisterCommand('highlightCode', {
        title: 'Highlight your code',
        undo: true,
        focus: false,
        callback: async function () {
          await (<EditorObject>this).syntaxHighlighter.highlight();
        },
      });
      this.fe.RegisterShortcut(70, 'highlightCode', 'F', 'F', false);
    }
  }
}

new FroalaCodeHighlighter.SyntaxHighlighter(FroalaEditor);
declare var FroalaEditor: FroalaEditor;
