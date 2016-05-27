# easythemes

Here's the basic idea: use CSS variables to make theming Firefox as easy as using a color picker.

We'll put this in an add-on that creates a new page, called `about:theme`, where users can change
values of built-in CSS styles using a color picker. Might be nice to allow JSON theme import/export,
too. If we have export and import, why not set up a silly little website where users can share, install,
and discuss themes? You could sign in with a Firefox Account, see which color schemes are most popular.

It might also make sense to provide a background image option on the page, since you could easily set
a CSS background to a tiled or stretched image. This could be really cool.


How can we do it?

Firefox uses a set of built-in special shortcut colors, like `HighlightText` or `ButtonText`. These are
customized for each major OS (linux, windows, mac).
(If you're curious, you can see a complete list of colors on
MDN [here](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Mozilla_System_Color_Extensions).)

Firefox has also entered into the era of CSS variables, and you can dynamically
change the value of a CSS variable: just use JS to toggle the variable's value in
a style attribute on the element you want to restyle. That's it!

Putting these two facts together, we can replace every occurrence of the special colors with
a variable that has the same name: `CaptionText` becomes `var(--CaptionText)`, and so on.

We can script these values by twiddling a style attribute on the topmost element in the XUL DOM.

OK, great. That means we could create an about:theme page, where users can fill in fields
for each of the default colors, with a color picker available if you need it.

This sounds pretty rad! Let's build it and see how it goes :-)
