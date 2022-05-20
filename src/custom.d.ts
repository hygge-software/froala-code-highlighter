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
