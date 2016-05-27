/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
                    .getService(Components.interfaces.nsIStyleSheetService);
const ios = Components.classes["@mozilla.org/network/io-service;1"]
                    .getService(Components.interfaces.nsIIOService);

const EXPORTED_SYMBOLS = ['StylesheetManager'];

function StylesheetManager() {}

StylesheetManager.prototype = {

  // Given a JSON object with the CSS variables that occur in the devedition
  // theme css include file, dynamically create and return a stylesheet that
  // can be inserted into the XUL DOM.
  //
  // List of expected vars (pulled from devedition light theme):
  // TODO: instead of prompting the user to fill in all these, just prompt for
  //       a reasonable number (5-10), then infer the remaining colors.
  //
  //  --url-and-searchbar-background-color: #fff;
  //  --chrome-background-color: #E3E4E6;
  //  --chrome-color: #18191a;
  //  --chrome-secondary-background-color: #f5f6f7;
  //  --chrome-navigator-toolbox-separator-color: #cccccc;
  //  --chrome-nav-bar-separator-color: #B6B6B8;
  //  --chrome-nav-buttons-background: #ffffff; /* --theme-body-background */
  //  --chrome-nav-buttons-hover-background: #DADBDB;
  //  --chrome-nav-bar-controls-border-color: #ccc;
  //  --chrome-selection-color: #f5f7fa;
  //  --chrome-selection-background-color: #4c9ed9;
  //  --tab-background-color: #E3E4E6;
  //  --tab-hover-background-color: #D7D8DA;
  //  --tab-selection-color: #f5f7fa;
  //  --tab-selection-background-color: #4c9ed9;
  //  --tab-selection-box-shadow: none;
  //  --pinned-tab-glow: radial-gradient(22px at center calc(100% - 2px), rgba(76,158,217,0.9) 13%, transparent 16%);
  //  --toolbarbutton-hover-background: #eaeaea;
  //  --toolbarbutton-hover-boxshadow: none;
  //  --toolbarbutton-hover-bordercolor: rgba(0,0,0,0.1);
  //  --toolbarbutton-active-background: #d7d7d8 border-box;
  //  --toolbarbutton-active-boxshadow: none;
  //  --toolbarbutton-active-bordercolor: rgba(0,0,0,0.15);
  //  --toolbarbutton-checkedhover-backgroundcolor: #d7d7d8;
  createStylesheet: function(colors) {
    let stylesheet = `
      :root,
      :root[devtoolstheme="light"],
      :root[devtoolstheme="dark"] {
        --url-and-searchbar-background-color: ${colors['--url-and-searchbar-background-color']};

        --chrome-background-color: ${colors['--chrome-background-color']};
        --chrome-color: ${colors['--chrome-color']};
        --chrome-secondary-background-color: ${colors['--chrome-secondary-background-color']};
        --chrome-navigator-toolbox-separator-color: ${colors['--chrome-navigator-toolbox-separator-color']};
        --chrome-nav-bar-separator-color: ${colors['--chrome-nav-bar-separator-color']};
        --chrome-nav-buttons-background: ${colors['--chrome-nav-buttons-background']};
        --chrome-nav-buttons-hover-background: ${colors['--chrome-nav-buttons-hover-background']};
        --chrome-nav-bar-controls-border-color: ${colors['--chrome-nav-bar-controls-border-color']};
        --chrome-selection-color: ${colors['--chrome-selection-color']};
        --chrome-selection-background-color: ${colors['--chrome-selection-background-color']};

        --tab-background-color: ${colors['--tab-background-color']};
        --tab-hover-background-color: ${colors['--tab-hover-background-color']};
        --tab-selection-color: ${colors['--tab-selection-color']};
        --tab-selection-background-color: ${colors['--tab-selection-background-color']};
        --tab-selection-box-shadow: ${colors['tab-selection-box-shadow']};
        --pinned-tab-glow: ${colors['--pinned-tab-glob']};

        /* Toolbar buttons */
        --toolbarbutton-hover-background: ${colors['--toolbarbutton-hover-background']};
        --toolbarbutton-hover-boxshadow: ${colors['--toolbarbutton-hover-boxshadow']};
        --toolbarbutton-hover-bordercolor: ${colors['--toolbarbutton-hover-bordercolor']};
        --toolbarbutton-active-background: ${colors['--toolbar-active-background']} border-box;
        --toolbarbutton-active-boxshadow: ${colors['--toolbarbutton-active-boxshadow']};
        --toolbarbutton-active-bordercolor: ${colors['--toolbarbutton-active-bordercolor']};
        --toolbarbutton-checkedhover-backgroundcolor: ${colors['--toolbarbutton-checkedhover-backgroundcolor']};
      }
    `;
    return stylesheet;
  },

  // save a stylesheet under this extension, overwriting the default css file.
  // The simplest thing is to overwrite the default: 'chrome://easythemes-skin/content/custom.inc.css'.
  //
  // Would be nicer to let different themes be saved under user-supplied names,
  // so that different themes can be saved and reloaded.
  saveStylesheet: function(contents) {
    // TODO: use chrome.manifest to convert the chrome URL
    //       'chrome://easythemes-skin/content/custom.inc.css'
    //       to an OS file path.
    // TODO: Once we know the file path, use OS.file to overwrite it.
  },

  // Load a stylesheet into the XUL DOM.
  // stylesheet service copypasta lifted from https://mdn.io/using_the_stylesheet_service
  loadStylesheet: function(stylesheetURL) {
    const url = stylesheetURL || CUSTOM_STYLESHEET_URL;
    const uri = ios.newURI(url, null, null);
    if(!sss.sheetRegistered(uri, sss.AGENT_SHEET)) {
      sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
    }

  },

  unloadStylesheet: function(stylesheetURL) {
    const url = stylesheetURL || CUSTOM_STYLESHEET_URL;
    const uri = ios.newURI(url, null, null);
    if(sss.sheetRegistered(uri, sss.AGENT_SHEET)) {
      // TODO: is unregisterSheet synchronous?
      sss.unregisterSheet(uri, sss.AGENT_SHEET);
    }
  },
  
  // Use this function to reload a stylesheet in the DOM after updating it.
  replaceStylesheet: function(stylesheetURL) {
    this.unloadStylesheet(stylesheetURL);
    this.loadStylesheet(stylesheetURL);
  }
};
