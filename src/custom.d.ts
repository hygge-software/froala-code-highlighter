declare module '*.svg' {}
declare module 'language-classifier';

declare type FroalaEditor = {
  /**
   * Define a custom icon.
   *
   * @param name Label given to this icon to be used in registering commands etc...
   * @param parameters The parameters required to inject the icon into the template library's html template
   */
  DefineIcon(name: string, parameters: Partial<DefineIconParameters>): void;

  DefineIconTemplate: (name: string, template: string) => void;

  /**
   * Registers a button
   * @param name Label given to the commang to be used in registering in button options
   * @param parameters
   */
  RegisterCommand(name: string, parameters: Partial<RegisterCommandParameters>): void;

  /**
   * @param keyCode Key code of the key pressed
   * @param command Command that should be triggered
   * @param commandValue Value passed to the command
   * @param shortcutLetter The letter to be shown in the tooltip for shortcut
   * @param shiftKeyRequired Shortcut needs to have the SHIFT key pressed
   * @param optionKeyRequired Shortcut needs to have the OPTION key pressed
   */
  RegisterShortcut: (
    keyCode: number,
    command: string,
    commandValue: any,
    shortcutLetter?: string,
    shiftKeyRequired?: boolean,
    optionKeyRequired?: boolean,
  ) => void;
  PLUGINS: GenericObject<(editor: EditorObject) => CustomPlugin>;
};

declare interface Clean {
  html(dirtyHtml: string): string;
  tables(): void;
  lists(): void;
  invisibleSpaces(dirtyHtml: string): void;
}

declare interface CustomPlugin {
  _init(): void;
  highlight(): Promise<void>;
  createHighlighter(lang: Lang[], theme: StringLiteralUnion<Theme>): Promise<void>;
}

declare interface DefineIconParameters {
  template: string;
  SVG: typeof import('*.svg');
}

declare type EditorObject = {
  clean: Clean;
  $el: FroalaElement;
  html: HTML;
  selection: FroalaSelection;
  syntaxHighlighter: CustomPlugin;
};

declare interface FroalaElement {
  get(): Element[];
}

declare interface FroalaSelection {
  blocks(): Element[];
  clear(): object;
  element(): HTMLElement;
  endElement(): Element;
  get(): Selection;
  inEditor(): boolean;
  info(element: Element): object;
  isCollapsed(): boolean;
  isFull(): boolean;
  ranges(index?: number): Range | Range[];
  restore(): object;
  save(): object;
  setAfter(node: Element): object;
  setAtEnd(node: Element): object;
  setAtStart(node: Element): object;
  setBefore(node: Element): object;
  text(): string;
}

declare type GenericObject<T = any> = { [key: string]: T };

declare interface Highlighter {
  createPlugin(): void;
}

declare interface HTML {
  cleanEmptyTags(): object;
  get(keepMarkers?: boolean, keepClasses?: boolean): string;
  getSelected(): string;
  unwrap(): void;
  wrap(temp?: boolean, tables?: boolean, blockquote?: boolean): void;
  insert(html: string, clean?: boolean, doSplit?: boolean): object;
  set(html: string): object;
}

declare interface Integration {
  cleanEmpty(froalaEl: Element): void;
  codeToHtml(source: string, lang: string): Promise<string>;
  createHighlighter(): Promise<void>;
}

declare type Lang = 'abap' | 'actionscript-3' | 'ada' | 'apache' | 'apex' | 'apl' | 'applescript' | 'asm' | 'astro' | 'awk' | 'ballerina' | 'bat' | 'batch' | 'berry' | 'be' | 'bibtex' | 'bicep' | 'c' | 'clojure' | 'clj' | 'cobol' | 'codeql' | 'ql' | 'coffee' | 'cpp' | 'crystal' | 'csharp' | 'c#' | 'css' | 'cue' | 'd' | 'dart' | 'diff' | 'docker' | 'dream-maker' | 'elixir' | 'elm' | 'erb' | 'erlang' | 'fish' | 'fsharp' | 'f#' | 'gherkin' | 'git-commit' | 'git-rebase' | 'gnuplot' | 'go' | 'graphql' | 'groovy' | 'hack' | 'haml' | 'handlebars' | 'hbs' | 'haskell' | 'hcl' | 'hlsl' | 'html' | 'ini' | 'java' | 'javascript' | 'js' | 'jinja-html' | 'json' | 'jsonc' | 'jsonnet' | 'jssm' | 'fsl' | 'jsx' | 'julia' | 'jupyter' | 'kotlin' | 'latex' | 'less' | 'lisp' | 'logo' | 'lua' | 'make' | 'makefile' | 'markdown' | 'md' | 'marko' | 'matlab' | 'mdx' | 'nginx' | 'nim' | 'nix' | 'objective-c' | 'objc' | 'objective-cpp' | 'ocaml' | 'pascal' | 'perl' | 'php' | 'plsql' | 'postcss' | 'powershell' | 'ps' | 'ps1' | 'prisma' | 'prolog' | 'pug' | 'jade' | 'puppet' | 'purescript' | 'python' | 'py' | 'r' | 'raku' | 'perl6' | 'razor' | 'rel' | 'riscv' | 'ruby' | 'rb' | 'rust' | 'rs' | 'sas' | 'sass' | 'scala' | 'scheme' | 'scss' | 'shaderlab' | 'shader' | 'shellscript' | 'shell' | 'bash' | 'sh' | 'zsh' | 'smalltalk' | 'solidity' | 'sparql' | 'sql' | 'ssh-config' | 'stata' | 'stylus' | 'styl' | 'svelte' | 'swift' | 'system-verilog' | 'tasl' | 'tcl' | 'tex' | 'toml' | 'tsx' | 'turtle' | 'twig' | 'typescript' | 'ts' | 'vb' | 'cmd' | 'verilog' | 'vhdl' | 'viml' | 'vim' | 'vimscript' | 'vue-html' | 'vue' | 'wasm' | 'wenyan' | '文言' | 'xml' | 'xsl' | 'yaml' | 'zenscript';


declare interface RegisterCommandParameters {
  title: string;
  icon: string;
  undo: boolean;
  focus: boolean;
  showOnMobile: boolean;
  refreshAfterCallback: boolean;
  callback: (buttonName: string) => void;
  refresh: (button: [Element]) => void;
}

declare type StringLiteralUnion<T extends U, U = string> = T | (U & {});
declare type Theme = 'css-variables' | 'dark-plus' | 'dracula-soft' | 'dracula' | 'github-dark-dimmed' | 'github-dark' | 'github-light' | 'light-plus' | 'material-darker' | 'material-default' | 'material-lighter' | 'material-ocean' | 'material-palenight' | 'min-dark' | 'min-light' | 'monokai' | 'nord' | 'one-dark-pro' | 'poimandres' | 'rose-pine-dawn' | 'rose-pine-moon' | 'rose-pine' | 'slack-dark' | 'slack-ochin' | 'solarized-dark' | 'solarized-light' | 'vitesse-dark' | 'vitesse-light';

