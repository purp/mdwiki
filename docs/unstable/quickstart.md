# Quick Start

Note: If you are already familiar with Markdown, you might want to look at [the source of this wiki][src], which is itself created with MDwiki.

## Markdown

MDWiki uses [Markdown][markdown] as a markup language. No knowledge of HTML or CSS is required to construct a website.

A simple `index.md` could look like:

```md
# Heading

## SubHeading

* list item 1
* list item 2

This is a hyperlink to [Google](http://google.com).

Images are like hyperlinks, but with an exclamation mark in front of them:
![alt](http://placekitten.com/g/250/250)

```

MDwiki uses the [GitHub flavored markdown dialect][gfm], so you can i.e. add tables:

```md
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

See the [GitHub Markdown Cheatsheet][gfmsheet] for detailed GFM reference.

***

## Making a website out of it

All you have to do is upload your markdown files with an `.md` file extension together with the [mdwiki.html][download] and access them via the hashbang `#!` character:

```md
http://example.com/mdwiki.html#!myfile.md
```

It is advised that you create an `index.md` file which serves as a starting point for your wiki when no parameter is given - in this case MDwiki will automatically fetch and display the `index.md`. If you also rename the `mdwiki.html` file into `index.html`, there are no parameters required and you can access your wiki at `http://example.com/`!

***

## Adding a navigation

Create a `navigation.md` file in the same directory as the `mdwiki.html` and put in the links that make up your menu:

```md
# Your wiki name

[Home](home.md)
[About](about.md)
[Download](download.md)

```

The first line is a Markdown heading, which will be used as the website brand in the navbar. Standard Markdown links are to be used for the navbar entries.

For more complex menus, nesting submenu items as a list and using horizontal lines that will be rendered as dividers is also possible:

```md
# Brand name

[Menu Item 1]()

* # SubMenu Heading 1

* [SubMenu Item 1](subitem1.md)
* [SubMenu Item 2](subitem2.md)

***

* # SubMenu Heading 2

* [SubMenu Item 3](subitem3.md)

***

* # SubMenu Heading 3

* [SubMenu Item 3](subitem3.md)

[Menu Item 2](item2.md)

***

[Menu Item 3](item3.md)
```

If a bulleted list of links is supplied as in the above example, the list will become a dropdown in the navigation bar displaying a submenu. In order for this to work, the toplevel link has to have an empty target (see Menu Item 1 in the above example). Dropdown headings are also possible by prepending a single `#` in front.

***

## Creating links

Links to anywhere in the web are done via regular Markdown links:

```md
[Google](http://www.google.com)
```

Links within the wiki are just plain relative links:

```md
[Go to download](download.md)
```

Internal links will be prefix automatically with the `#!` hashbang:

[Go to download](download.md)

## Images

Images are regularly placed as in standard markdown using the `![alt](href "title")` notation. MDwiki will create a nice highlight-like popup if you click an image. You can group images together by __not__ putting an empty line in between them.

Example:

```md
![alt](http://placekitten.com/g/1200/300 "A kitten")

![alt](http://placekitten.com/g/550/450 "First of two kittens")
![alt](http://placekitten.com/g/550/450 "Second of two kittens")

![alt](http://placekitten.com/g/400/350)
![alt](http://placekitten.com/g/400/350)
![alt](http://placekitten.com/g/400/350)
```

Will be rendered as:

![alt](http://placekitten.com/g/1200/300 "A kitten")

![alt](http://placekitten.com/g/550/450 "First of two kittens")
![alt](http://placekitten.com/g/550/450 "Second of two kittens")

![alt](http://placekitten.com/g/400/350)
![alt](http://placekitten.com/g/400/350)
![alt](http://placekitten.com/g/400/350)

### Images as Links

To use an image as a link, use the following syntax:

```md
[![ImageCaption](path/to/image.png)](http://www.linktarget.com)
```

Example:

```md
[![A kitten](http://placekitten.com/g/400/400)](http://www.placekitten.com)
```

[![A kitten](http://placekitten.com/g/400/400)](http://www.placekitten.com)

***

## Syntax highlighting

MDwiki supports [GFM][gfm] like syntax highlighting. Put the name of the language after the backticks in the code block:

````text
```javascript
var hello = function () {
    // say hello
    alert('Hello world!');
}
```
````

Will render as:

```javascript
var hello = function () {
    // say hello
    alert('Hello world!');
}
```

Currently the following languages are supported:

|Language       |Keyword      |
|---------------|-------------|
|Bash           |bash         |
|C#             |csharp       |
|C++            |cpp          |
|CSS            |css          |
|CoffeeScript   |coffeescript |
|HTML           |html         |
|HTTP           |http         |
|Java           |java         |
|JavaScript     |javascript   |
|PHP            |php          |
|Python         |python       |
|Ruby           |ruby         |
|SQL            |sql          |
|XML            |xml          |

## Gimmicks

Through the usage of [Gimmicks][gimmicks], which are like plugins, you can add much more dynamic elements into your wiki and use it in a very advanced way. See the [Gimmicks][gimmicks] page for a full reference.

[download]: download.md
[gfm]: http://github.github.com/github-flavored-markdown/
[gfmsheet]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[gimmicks]: gimmicks.md
[markdown]: http://daringfireball.net/projects/markdown/
[src]: https://github.com/Dynalon/mdwiki/tree/gh-pages
