# Froala Syntax Highlighter

Syntax highlighter tool based on [Shiki](https://github.com/shikijs/shiki/tree/main/packages/shiki) with programming language detection in the **Froala editor**. This package is compatible with Froala editor versions 3 and 4.

![https://cloudse1.seupload.com/cache/plugins/filepreviewer/41051/b954b6a7038cef46998d2e82d9f30d6e049ccbc172f20c52cc585a024e84b42c/1100x800_cropped.jpg](https://cloudse1.seupload.com/cache/plugins/filepreviewer/41051/b954b6a7038cef46998d2e82d9f30d6e049ccbc172f20c52cc585a024e84b42c/1100x800_cropped.jpg)

## Table of Contents

- [Requirements](#requirements)
- [Install instructions](#install-instructions)
  - [General installation instructions](#general-installation-instructions)
  - [Angular installation instructions](#angular-installation-instructions)
  - [ReactJS installation instructions](#reactjs-installation-instructions)
- [Documentation](#documentation)

## Requirements

- **npm** (\_v6+)
- **froala** (_v3+_)

## Install instructions

### General installation instructions

1. Install the npm module:

   ```bash
   npm install froala-syntax-highlighter
   ```

2. Load the module into your project:

   ```js
   <script src="node_modules/froala-syntax-highlighter/lib/index.js"></script>
   ```

3. Update Froala configuration:

- Add Syntax Highlighter button to the toolbar:

  ```js
  ${}.froalaEditor({
    // Enable the plugin.
    pluginsEnabled: ['syntaxHighlighter'],

    // Add the buttons to the toolbar and image edit buttons
    toolbarButtons:   ['highlightCode'],
    toolbarButtonsMD: ['highlightCode'],
    toolbarButtonsSM: ['highlightCode'],
    toolbarButtonsXS: ['highlightCode'],
    imageEditButtons: ['highlightCode'],
  })
  ```

  Notice the example assumes this directory structure:

  ```
  └───index.html
  └───node_modules
      └───froala-syntax-highlighter
  ```

### Angular installation instructions

#### Requirements

- **npm** (\_v6+)
- **froala** (_v3+_)
- **Angular** (_v9+_)

1. Run the following through the terminal

> ###### **Caution**
>
> **Note:** you can set the froala-editor and angular-froala-wysiwyg versions, as showed in the comment below, which lies between 3 and 4. In case the version is not specified, the latest stable version will be installed.

```bash
ng new $APP_NAME
# Notice that **$APP_NAME** needs to be replaced by the name that you choose.

cd $APP_NAME

npm install --save angular-froala-wysiwyg

npm install --save froala-syntax-highlighter
```

2. Open the `src/app/app.module.ts` file and add:

```ts
// From Froala instructions.
// Import all Froala Editor plugins.
import "froala-editor/js/plugins.pkgd.min.js";

// Expose FroalaEditor instance to window.
declare const require: any;
(window as any).FroalaEditor = require("froala-editor");
require("froala-syntax-highlighter/lib"); // Import plugin.

// Import Angular plugin.
import {
  FroalaEditorModule,
  FroalaViewModule,
} from "angular-froala-wysiwyg";

...

@NgModule({
    ...
    imports: [... FroalaEditorModule.forRoot(), FroalaViewModule.forRoot() ... ],
    ...
})
```

3. Open `.angular.json` file and add:

```json
"styles": [
   "src/styles.css",
   "./node_modules/froala-editor/css/froala_editor.pkgd.min.css",
   "./node_modules/froala-editor/css/froala_style.min.css"
 ]
```

4. Open `src/app/app.component.ts` and replace all with:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Set App Title.
  title = 'Angular froala demo';

  // Initialize the editor content.
  public content: string = '<p class="text">const hello = "hello";</p>';

  // Set options for the editor.
  public options: Object = {
    pluginsEnabled: ['syntaxHighlighter'],
    toolbarButtons: ['highlightCode'],
  };
}
```

5. Open src/app/app.component.html and replace all with:

```html
<h1>Angular and Froala demo</h1>
<!-- Pass options and content to the component. -->
<div id="editor" [froalaEditor]="options" [(froalaModel)]="content"></div>
```

6. Finally, run the development server to initialize the Froala editor.

```bash
ng serve
```

### ReactJS installation instructions

#### Requirements

- **npm** (\_v6+)
- **froala** (_v3+_)
- **create-react-app** (_v3+_)

1. Run the following through the terminal

```bash
create-react-app $APP_NAME
# Notice that **$APP_NAME** needs to be replaced by the name that you choose.

cd $APP_NAME

npm install react-froala-wysiwyg --save

npm install froala-syntax-highlighter --save
```

2. Replace all content in `src/index.js` by:

```js
// Load react default libraries.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// Load Froala Editor scripts and styles.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';

window.FroalaEditor = require('froala-editor');
// Load Syntax Highlighter -froala plugin.
require('froala-syntax-highlighter');

const froalaConfig = {
  pluginsEnabled: ['syntaxHighlighter'],
  toolbarButtons: ['highlightCode'],
};

// Set the initial content.
const content = '<p class="text">const hello = "hello"/p>';

ReactDOM.render(
  <FroalaEditorComponent tag="div" config={froalaConfig} model={content} />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
```

## Documentation

Default theme:

```ts
'min-light';
```

Themes:

```ts
export type Theme =
  | 'css-variables'
  | 'dark-plus'
  | 'dracula-soft'
  | 'dracula'
  | 'github-dark-dimmed'
  | 'github-dark'
  | 'github-light'
  | 'hc_light'
  | 'light-plus'
  | 'material-darker'
  | 'material-default'
  | 'material-lighter'
  | 'material-ocean'
  | 'material-palenight'
  | 'min-dark'
  | 'min-light'
  | 'monokai'
  | 'nord'
  | 'one-dark-pro'
  | 'poimandres'
  | 'rose-pine-dawn'
  | 'rose-pine-moon'
  | 'rose-pine'
  | 'slack-dark'
  | 'slack-ochin'
  | 'solarized-dark'
  | 'solarized-light'
  | 'vitesse-dark'
  | 'vitesse-light';
```

Programming Languages:

```ts
export type Lang =
  | 'javascript'
  | 'js'
  | 'typescript'
  | 'c'
  | 'c++'
  | 'python'
  | 'ruby'
  | 'php'
  | 'go'
  | 'java'
  | 'html'
  | 'css';
```

To change theme you need to call `createHighlighter` method on editor object

```ts
createHighlighter(langs: Lang[], theme: StringLiteralUnion<Theme>): Promise<void>;
```

Example

```ts
const config = {
  events: {
    initialized() {
      this.syntaxHighlighter.createHighlighter(['javascript', 'ruby'], 'github-light');
    },
  },
};
```
