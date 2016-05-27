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
	// Load custom styles into the XUL DOM.
	// stylesheet service copypasta lifted from https://mdn.io/using_the_stylesheet_service
	loadStylesheet: function(stylesheetURL) {
		const url = stylesheetURL || CUSTOM_STYLESHEET_URL;
		const uri = ios.newURI(url, null, null);
		if(!sss.sheetRegistered(uri, sss.USER_SHEET)) {
			sss.loadAndRegisterSheet(uri, sss.USER_SHEET);
		}

	},

	unloadStylesheet: function(stylesheetURL) {
		const url = stylesheetURL || CUSTOM_STYLESHEET_URL;
		const uri = ios.newURI(url, null, null);
		if(sss.sheetRegistered(uri, sss.USER_SHEET)) {
			// TODO: is unregisterSheet synchronous?
			sss.unregisterSheet(uri, sss.USER_SHEET);
		}
  },
	
	// Use this function to reload a stylesheet in the DOM after updating it.
	replaceStylesheet: function(stylesheetURL) {
		this.unloadStylesheet(stylesheetURL);
		this.loadStylesheet(stylesheetURL);
	}
};
