# easythemes

Here's the basic idea: use CSS variables to make theming Firefox as easy as using a color picker.

We'll put this in an add-on that creates a new page, called `about:theme`, where users can change
values of built-in CSS styles using a color picker. Might be nice to allow JSON theme import/export,
too. If we have export and import, why not set up a silly little website where users can share, install,
and discuss themes? You could sign in with a Firefox Account, see which color schemes are most popular.

It might also make sense to provide a background image option on the page, since you could easily set
a CSS background to a tiled or stretched image. This could be really cool.

### We have the technology

First, Firefox uses a set of built-in special shortcut colors, like `HighlightText` or `ButtonText`. These are
customized for each major OS (linux, windows, mac).
(If you're curious, you can see a complete list of colors on
MDN [here](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Mozilla_System_Color_Extensions).)

Second, Firefox supports CSS variables, so it's possible to dynamically
change the value of a CSS property: just use JS to toggle the variable's value in
a style attribute on the element you want to restyle, and use the variable syntax `var(--foo)`,
where `--foo` is a variable whose value can be set like any CSS property: `body { --foo: #123abc }`.

Putting these two facts together, it seems like we should be able to replace every 
occurrence of the special colors with a variable that has the same name: 
`CaptionText` becomes `var(--CaptionText)`, and so on. The most reliable way to make
this change across platforms is probably to have an add-on load the browser's stylesheets
via xhr, use simple JS string replace to perform the substitutions, and then replace
the stylesheets on the XUL DOM with the hacked ones.

With the variables swapped into place, we could then script their values by twiddling
a style attribute on the topmost element in the XUL DOM.

### Users can interact with an unintimidating theme builder on `about:theme`

This functionality could be exposed to users via an about:theme page, where we can show
fields with a color preview for all the defaults, and allow colors to be set via hex code 
or using a color picker.

There's no reason we couldn't allow images to be uploaded and stretched across the browser
chrome. I don't know how well that will work in the current era of minimal chrome, but
maybe it'd be a nice reason to add a little more bezel around the page. (I suppose the thickness
of the border around the web page is probably modifiable via CSS, too.)

### Sharing themes / color schemes

If Firefox can be reskinned by changing a reasonable number of numeric values, and maybe an
image or two, it seems natural to think of exporting or importing the theme data as JSON.

If you can export and import data, then you can share themes with others really easily.

There happens to be a [whole section on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/themes/)
for people to share, rate, and discuss Firefox themes. Seems like lowering the barrier to
creating themes might help that community grow.

### Welp

This sounds pretty rad! Let's build it and see just how much harder this will be than
I've described above ;-)

