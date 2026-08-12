# HTML Interview Questions & Answers

> **Target:** Frontend Engineer / React / Next.js interviews  
> **Focus:** Important and tricky HTML concepts for 3–5 years of experience

---

## Table of Contents

1. [Semantic HTML](#1-semantic-html)
2. [`async` vs `defer`](#2-async-vs-defer)
3. [DOM and HTML Parsing](#3-dom-and-html-parsing)
4. [`div` vs `section` vs `article`](#4-div-vs-section-vs-article)
5. [`div` vs `span`](#5-div-vs-span)
6. [`button` vs `a`](#6-button-vs-a)
7. [`disabled` vs `readonly`](#7-disabled-vs-readonly)
8. [`id` vs `class` vs `name`](#8-id-vs-class-vs-name)
9. [GET vs POST](#9-get-vs-post)
10. [`button` vs `input type="button"` vs `submit`](#10-button-vs-input-typebutton-vs-submit)
11. [HTML Form Validation](#11-html-form-validation)
12. [`label` and Accessibility](#12-label-and-accessibility)
13. [`alt` Attribute](#13-alt-attribute)
14. [ARIA](#14-aria)
15. [DOCTYPE and Quirks Mode](#15-doctype-and-quirks-mode)
16. [`preload` vs `prefetch`](#16-preload-vs-prefetch)
17. [Quick Interview Revision](#17-quick-interview-revision)

---

# 1. Semantic HTML

### Q: What is Semantic HTML?

**Answer:**

Semantic HTML means using HTML elements according to their **meaning and purpose**, instead of using generic elements like `<div>` for everything.

```html
<header>
  <h1>My Website</h1>
</header>

<nav>
  <a href="/home">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <article>
    <h2>React Performance</h2>
    <p>Some content...</p>
  </article>

  <section>
    <h2>Comments</h2>
  </section>
</main>

<footer>
  Copyright 2026
</footer>
```

### Common Semantic Elements

```text
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
<figure>
<figcaption>
<time>
```

### Why is Semantic HTML important?

1. **Accessibility** — screen readers understand the page structure better.
2. **SEO** — search engines can better understand the content.
3. **Maintainability** — code is easier to understand.
4. **Built-in browser behavior** — semantic elements provide useful default behavior.

### Interview Answer

> Semantic HTML means using HTML elements based on their actual meaning, such as `nav` for navigation, `article` for self-contained content, and `button` for actions. It improves accessibility, SEO, and maintainability.

---

# 2. `async` vs `defer`

### Q: What is the difference between `async` and `defer`?

Both allow scripts to download while HTML is being parsed.

```html
<script async src="analytics.js"></script>

<script defer src="app.js"></script>
```

### `async`

- Downloads while HTML is parsing.
- Executes as soon as downloading finishes.
- Can execute before HTML parsing is complete.
- Execution order is **not guaranteed**.

### `defer`

- Downloads while HTML is parsing.
- Executes after HTML parsing is complete.
- Execution order is maintained.

### Easy way to remember

> **async = execute whenever ready**  
> **defer = execute after HTML parsing**

### When would you use them?

For independent scripts such as analytics:

```html
<script async src="analytics.js"></script>
```

For scripts that depend on the DOM or need predictable order:

```html
<script defer src="app.js"></script>
```

---

# 3. DOM and HTML Parsing

### Q: What happens when the browser receives HTML?

The browser parses the HTML and creates a **DOM (Document Object Model)**.

For example:

```html
<html>
  <body>
    <h1>Hello</h1>
    <p>Welcome</p>
  </body>
</html>
```

The browser creates a tree:

```text
Document
└── html
    └── body
        ├── h1
        └── p
```

### Rendering Process

A simplified rendering process is:

```text
HTML
 ↓
HTML Parsing
 ↓
DOM
 ↓
CSS Parsing
 ↓
CSSOM
 ↓
Render information
 ↓
Layout
 ↓
Paint
```

### What is DOM?

DOM is an object representation of the HTML document that JavaScript can interact with.

```javascript
document.getElementById("title");
```

can access:

```html
<h1 id="title">Hello</h1>
```

### React Connection

React ultimately updates the **real DOM**.

React maintains its own representation of the UI and uses reconciliation to determine what changes need to be applied to the DOM.

### Interview Answer

> When the browser receives HTML, it parses it and creates the DOM tree. CSS is also parsed into the CSSOM, and the browser uses these to calculate layout and paint the page. JavaScript can interact with the DOM through browser APIs.

---

# 4. `div` vs `section` vs `article`

### Q: What is the difference between `div`, `section`, and `article`?

## `<div>`

A generic container with **no semantic meaning**.

```html
<div class="card">
  ...
</div>
```

Use it when you simply need a container for styling, layout, or grouping.

## `<section>`

Represents a **thematic section** of a document.

Usually it should have a heading.

```html
<section>
  <h2>Our Services</h2>
  <p>We provide web development services.</p>
</section>
```

## `<article>`

Represents **self-contained content** that can make sense independently.

Examples:

- Blog post
- News article
- Product review
- Forum post

```html
<article>
  <h2>React Performance Tips</h2>
  <p>Here are some techniques to improve React performance...</p>
</article>
```

### Easy way to remember

```text
div
→ Generic container

section
→ Thematic section

article
→ Independent/self-contained content
```

### Interview Answer

> I use `div` for generic grouping, `section` for a thematic section of content, and `article` for self-contained content that could be independently distributed or reused.

---

# 5. `div` vs `span`

### Q: What is the difference between `div` and `span`?

Both are generic, non-semantic elements, but their default display behavior differs.

### `<div>`

Normally behaves as a **block-level element**.

```html
<div>Hello</div>
<div>World</div>
```

Conceptually:

```text
Hello
World
```

### `<span>`

Normally behaves as an **inline element**.

```html
<p>
  Hello <span>Hareesh</span>
</p>
```

The span stays within the same line.

### Main Difference

```text
div
→ Block-level by default

span
→ Inline by default
```

### Important

CSS can change this behavior:

```css
span {
  display: block;
}
```

So the semantic/intended difference is:

> `div` is generally used for block-level grouping, while `span` is used for inline grouping.

---

# 6. `button` vs `a`

### Q: When should you use `<button>` and when should you use `<a>`?

Use `<a>` for **navigation**.

```html
<a href="/profile">
  Profile
</a>
```

Use `<button>` for an **action**.

```html
<button type="button">
  Delete
</button>
```

### Example

```text
Navigate to another page
→ <a>

Perform an action
→ <button>
```

### Bad Example

```html
<div onclick="deleteUser()">
  Delete
</div>
```

A `<button>` should normally be used instead:

```html
<button type="button" onclick="deleteUser()">
  Delete
</button>
```

### Why?

Semantic elements provide built-in:

- Keyboard behavior
- Focus behavior
- Accessibility semantics
- Browser interaction

### Interview Answer

> I use an anchor when the user is navigating to a resource or URL, and a button when the user is performing an action.

---

# 7. `disabled` vs `readonly`

### Q: What is the difference between `disabled` and `readonly`?

## `disabled`

```html
<input
  disabled
  value="Hareesh"
/>
```

A disabled input:

- Cannot be edited.
- Normally cannot receive focus.
- Is excluded from form submission.

## `readonly`

```html
<input
  readonly
  value="Hareesh"
/>
```

A readonly input:

- Cannot be edited.
- Can generally receive focus.
- Its value can be submitted with the form.

### Example

Suppose I want to display a user ID but don't want the user to change it:

```html
<input
  name="userId"
  value="123"
  readonly
/>
```

### Interview Answer

> `disabled` makes a form control inactive and its value is generally not submitted. `readonly` prevents editing but keeps the control active and its value can still be submitted.

---

# 8. `id` vs `class` vs `name`

### Q: What is the difference between `id`, `class`, and `name`?

Example:

```html
<input
  id="email"
  class="form-input"
  name="email"
/>
```

## `id`

Used to uniquely identify an element.

```html
<input id="email">
```

It can be referenced by:

```html
<label for="email">
  Email
</label>
```

## `class`

Used to group elements.

```html
<input class="form-input">
<input class="form-input">
```

Commonly used for CSS.

```css
.form-input {
  padding: 8px;
}
```

## `name`

Important for form submission.

```html
<input
  name="email"
  value="test@example.com"
/>
```

The submitted form data can contain:

```text
email=test@example.com
```

### Easy way to remember

```text
id
→ Identify one element

class
→ Group elements

name
→ Identify form data
```

---

# 9. GET vs POST

### Q: What is the difference between GET and POST?

## GET

```html
<form method="GET">
```

The data is generally appended to the URL.

Example:

```text
/search?query=react
```

Useful for:

- Search
- Filtering
- Retrieving data

GET requests can also be bookmarked and shared because the parameters are in the URL.

## POST

```html
<form method="POST">
```

The data is sent in the request body.

Useful for:

- Creating data
- Submitting forms
- Operations that change server-side state

### Important Interview Point

POST does **not** automatically mean secure.

```text
HTTP
→ Data can be intercepted

HTTPS
→ Encrypts data in transit
```

### Interview Answer

> GET generally sends parameters in the URL and is commonly used for retrieving data, while POST sends data in the request body and is commonly used for submitting or creating data. HTTPS, not POST itself, provides transport encryption.

---

# 10. `button` vs `input type="button"` vs `submit`

### Q: What is the difference?

## `<button>`

More flexible because it can contain text, icons, or other content.

```html
<button type="button">
  Save
</button>
```

## `<input type="button">`

A simple button.

```html
<input
  type="button"
  value="Save"
/>
```

## `<input type="submit">`

Submits the form.

```html
<input
  type="submit"
  value="Submit"
/>
```

### Important Interview Question

What happens here?

```html
<form>
  <button>Submit</button>
</form>
```

By default, a `<button>` inside a form has submit behavior.

If you don't want that:

```html
<form>
  <button type="button">
    Cancel
  </button>
</form>
```

### Interview Answer

> I generally prefer `<button>` because it is more flexible. `input type="button"` is a basic non-submit button, while `input type="submit"` submits the form. Also, a button inside a form defaults to submit unless its type is explicitly set.

---

# 11. HTML Form Validation

### Q: What is HTML form validation?

HTML provides built-in validation using attributes.

Example:

```html
<form>
  <input
    type="email"
    required
    minlength="5"
  />

  <button type="submit">
    Submit
  </button>
</form>
```

The browser can automatically validate the input.

### Common Validation Attributes

```text
required
type
min
max
minlength
maxlength
pattern
```

### `pattern`

We can specify a regular expression:

```html
<input
  type="text"
  pattern="[A-Za-z]+"
  required
/>
```

### Important

HTML validation is useful for user experience, but **server-side validation is still required** because client-side validation can be bypassed.

### React

In React applications, for complex forms, we can use libraries such as:

```text
React Hook Form
Zod
Yup
```

---

# 12. `label` and Accessibility

### Q: Why should we use `<label>`?

A label provides a meaningful name for a form control.

```html
<label for="email">
  Email
</label>

<input
  id="email"
  type="email"
/>
```

The important relationship is:

```text
label's for
      ↓
input's id
```

Both should match.

### Benefits

- Better accessibility
- Screen readers understand the field
- Clicking the label can focus the input
- Better user experience

### Alternative

We can also nest the input:

```html
<label>
  Email
  <input type="email">
</label>
```

### Interview Answer

> I use labels to provide an accessible name for form controls. The `for` attribute should match the input's `id`, or the input can be nested inside the label.

---

# 13. `alt` Attribute

### Q: Why is the `alt` attribute important?

`alt` provides alternative text for an image.

```html
<img
  src="profile.jpg"
  alt="Hareesh's profile photo"
/>
```

It helps:

- Screen readers
- Accessibility
- Users when images cannot be displayed

### Decorative Images

If an image is purely decorative:

```html
<img
  src="divider.png"
  alt=""
/>
```

The empty `alt` tells assistive technologies that the image does not provide meaningful content.

### Important

Don't write useless alt text like:

```html
<img
  src="profile.jpg"
  alt="image"
/>
```

Instead describe the meaningful content:

```html
<img
  src="profile.jpg"
  alt="Hareesh's profile photo"
/>
```

---

# 14. ARIA

### Q: What is ARIA?

ARIA stands for:

> **Accessible Rich Internet Applications**

ARIA provides additional accessibility information when native HTML semantics aren't enough.

Example:

```html
<button aria-label="Close">
  X
</button>
```

A screen reader can understand the purpose of the button as "Close".

### Common ARIA Attributes

```text
aria-label
aria-labelledby
aria-describedby
aria-expanded
aria-hidden
aria-live
aria-pressed
aria-selected
```

### Example

```html
<button
  aria-expanded="false"
  aria-controls="menu"
>
  Menu
</button>
```

This tells assistive technologies about the relationship and state of the menu.

### Important Interview Point

**Prefer native HTML first.**

Good:

```html
<button>
  Delete
</button>
```

Usually better than:

```html
<div role="button">
  Delete
</div>
```

### Interview Answer

> ARIA adds accessibility information to elements when native HTML semantics aren't sufficient. I prefer semantic HTML first and use ARIA only when necessary.

---

# 15. DOCTYPE and Quirks Mode

### Q: What is `DOCTYPE`?

Modern HTML documents normally start with:

```html
<!DOCTYPE html>
```

It tells the browser to use **standards mode**.

### What is Quirks Mode?

If the browser doesn't detect a proper DOCTYPE, it can enter quirks mode to maintain compatibility with older websites.

This can cause differences in:

- Layout
- Box model behavior
- Rendering

### Interview Answer

> `<!DOCTYPE html>` tells the browser to use standards mode for the document. Without the correct DOCTYPE, the browser may enter quirks mode and use legacy rendering behavior.

---

# 16. `preload` vs `prefetch`

### Q: What is the difference between `preload` and `prefetch`?

Both are resource hints, but they have different purposes.

## `preload`

Used when a resource is **important for the current page**.

```html
<link
  rel="preload"
  href="/font.woff2"
  as="font"
  crossorigin
/>
```

It tells the browser to fetch the resource early.

Examples:

```text
Important font
Hero image
Critical resource
```

## `prefetch`

Used when a resource **might be needed in the future**.

```html
<link
  rel="prefetch"
  href="/next-page.js"
/>
```

For example, if the user is currently on:

```text
/home
```

and we expect them to navigate to:

```text
/dashboard
```

we could potentially prefetch resources for the dashboard.

### Easy Way to Remember

```text
preload
→ Important now

prefetch
→ Maybe needed later
```

### Interview Answer

> `preload` tells the browser to fetch an important resource for the current page early, while `prefetch` is a lower-priority hint for resources that may be needed in the future.

---

# 17. Quick Interview Revision

## Semantic HTML

```text
Use elements based on their meaning.

<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
```

---

## `async` vs `defer`

```text
async
→ Execute as soon as downloaded
→ Order not guaranteed

defer
→ Execute after HTML parsing
→ Order maintained
```

---

## DOM

```text
HTML
 ↓
HTML Parsing
 ↓
DOM
 ↓
CSSOM
 ↓
Layout
 ↓
Paint
```

---

## `div` vs `section` vs `article`

```text
div
→ Generic container

section
→ Thematic section

article
→ Self-contained content
```

---

## `div` vs `span`

```text
div
→ Block-level by default

span
→ Inline by default
```

---

## `button` vs `a`

```text
a
→ Navigation

button
→ Action
```

---

## `disabled` vs `readonly`

```text
disabled
→ Cannot edit
→ Generally not submitted

readonly
→ Cannot edit
→ Can be submitted
```

---

## `id` vs `class` vs `name`

```text
id
→ Unique element identifier

class
→ Grouping / styling

name
→ Form field name
```

---

## GET vs POST

```text
GET
→ Parameters generally in URL
→ Commonly used for retrieving data

POST
→ Data in request body
→ Commonly used for submitting data
```

---

## Button Types

```text
<button>
→ Flexible

<input type="button">
→ Normal button

<input type="submit">
→ Submit form
```

Remember:

```html
<button>
```

inside a form defaults to submit behavior.

---

## Form Validation

```text
required
type
min
max
minlength
maxlength
pattern
```

Client-side validation is **not a replacement for server-side validation**.

---

## Label

```html
<label for="email">
  Email
</label>

<input id="email">
```

```text
for
 ↓
id
```

---

## `alt`

```text
Meaningful image
→ Descriptive alt

Decorative image
→ alt=""
```

---

## ARIA

```text
ARIA
→ Additional accessibility information

Prefer semantic HTML first.
```

---

## DOCTYPE

```html
<!DOCTYPE html>
```

```text
→ Standards mode
→ Avoids quirks mode
```

---

## `preload` vs `prefetch`

```text
preload
→ Important for current page

prefetch
→ Might be needed later
```

---

# 🔥 Top 10 I Would Definitely Prepare

For a **React/Next.js Frontend Engineer interview**, these are the ones I'd know very well:

```text
1. Semantic HTML
2. async vs defer
3. DOM and HTML parsing
4. div vs section vs article
5. div vs span
6. button vs a
7. disabled vs readonly
8. Forms + GET vs POST + validation
9. Accessibility + label + alt + ARIA
10. preload vs prefetch
```
