# CSS Interview Questions & Answers

> **Target:** Frontend Engineer / React / Next.js interviews  
> **Experience:** 3–5 years  
> **Focus:** Important, tricky, and practical CSS interview questions

## Top Topics

1. CSS Box Model
2. `box-sizing`
3. CSS Specificity
4. Inheritance
5. `display: block` vs `inline` vs `inline-block`
6. `display: none` vs `visibility: hidden` vs `opacity: 0`
7. CSS Positioning
8. `z-index` and Stacking Context
9. Flexbox
10. `justify-content` vs `align-items`
11. `flex: 1`
12. CSS Grid
13. Grid vs Flexbox
14. CSS Units
15. Pseudo-class vs Pseudo-element
16. `::before` and `::after`
17. Margin Collapsing
18. `nth-child` vs `nth-of-type`
19. Overflow
20. Why `position: sticky` sometimes doesn't work
21. CSS Variables
22. Responsive Design
23. Mobile-First CSS
24. Transitions vs Animations
25. `transform` vs position changes
26. `!important`
27. `calc()`, `min()`, `max()`, `clamp()`
28. CSS Stacking Context
29. CSS Performance
30. Container Queries

---

# 1. CSS Box Model

### Q: What is the CSS Box Model?

Every HTML element is treated as a rectangular box consisting of:

```text
Content
   ↓
Padding
   ↓
Border
   ↓
Margin
```

Example:

```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

With default `box-sizing: content-box`:

```text
Content width = 200px
Padding       = 40px
Border        = 10px
Total width   = 250px
```

### Interview Answer

> The CSS box model consists of content, padding, border, and margin. By default, width and height apply only to the content area when using `content-box`.

---

# 2. `box-sizing`: `border-box` vs `content-box`

### Q: What is the difference?

## `content-box`

Default behavior.

```css
.box {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
}
```

Actual width:

```text
200 + 40 + 10 = 250px
```

## `border-box`

Width includes padding and border.

```css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
}
```

Actual width:

```text
200px
```

### Common Reset

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

### Interview Answer

> `content-box` means width and height apply to the content only, while `border-box` includes padding and border within the specified width and height. I generally prefer `border-box` because sizing becomes more predictable.

---

# 3. CSS Specificity

### Q: What is CSS specificity?

Specificity determines which CSS rule wins when multiple rules target the same element.

General priority:

```text
!important
   ↓
Inline styles
   ↓
ID
   ↓
Class / attribute / pseudo-class
   ↓
Element / pseudo-element
```

Example:

```css
p { color: blue; }
.text { color: green; }
#title { color: red; }
```

```html
<p id="title" class="text">Hello</p>
```

The text will be red because the ID selector has higher specificity.

### Specificity Example

```css
#app .card p {
  color: red;
}
```

```text
ID      = 1
Class   = 1
Element = 1
Specificity = 1-1-1
```

### Interview Answer

> CSS specificity determines which rule wins when multiple selectors match an element. IDs have higher specificity than classes, and classes have higher specificity than element selectors.

---

# 4. Inheritance

### Q: What is CSS inheritance?

Some CSS properties automatically inherit from a parent to its children.

```css
.parent {
  color: red;
}
```

```html
<div class="parent">
  <p>Hello</p>
</div>
```

The `<p>` normally inherits the color.

Common inherited properties:

```text
color
font-family
font-size
line-height
text-align
```

Properties such as these generally do not inherit automatically:

```text
margin
padding
border
width
height
```

### Force Inheritance

```css
.child {
  color: inherit;
}
```

### Interview Answer

> CSS inheritance means certain properties are inherited from a parent element to its descendants. Text-related properties commonly inherit, while layout properties such as margin and padding generally don't.

---

# 5. `display: block` vs `inline` vs `inline-block`

### Q: What is the difference?

## `block`

```css
display: block;
```

- Starts on a new line
- Usually takes available width
- Width and height can be applied

Examples: `div`, `p`, `section`.

## `inline`

```css
display: inline;
```

- Stays in the same line
- Width and height generally don't behave as they do for block-level elements
- Horizontal margins and padding have different behavior from block elements

Examples: `span`, `a`, `strong`.

## `inline-block`

```css
display: inline-block;
```

Stays inline while allowing explicit width and height.

### Interview Answer

> Block elements start on a new line and can have dimensions, inline elements participate in the text flow, and inline-block elements stay inline while allowing explicit width and height.

---

# 6. `display: none` vs `visibility: hidden` vs `opacity: 0`

## `display: none`

```css
display: none;
```

- Removed from layout
- Doesn't occupy space
- Not normally rendered

## `visibility: hidden`

```css
visibility: hidden;
```

- Invisible
- Still occupies space

## `opacity: 0`

```css
opacity: 0;
```

- Transparent
- Still occupies space
- Can still participate in interaction depending on other properties

```text
display: none
→ No layout space

visibility: hidden
→ Space remains

opacity: 0
→ Space remains
→ Transparent
```

### Important

`opacity: 0` does not automatically make an element inaccessible or non-interactive.

---

# 7. CSS Positioning

### Q: Explain `static`, `relative`, `absolute`, `fixed`, and `sticky`.

## `static`

Default positioning.

## `relative`

```css
position: relative;
```

Remains in normal flow but can be visually offset. It also commonly establishes the containing block for absolutely positioned descendants.

## `absolute`

```css
position: absolute;
```

Removed from normal flow and positioned relative to the nearest appropriate containing block, commonly an ancestor with non-static positioning.

```css
.parent { position: relative; }
.child {
  position: absolute;
  top: 0;
  right: 0;
}
```

## `fixed`

```css
position: fixed;
```

Generally positioned relative to the viewport and remains fixed while scrolling.

## `sticky`

```css
position: sticky;
top: 0;
```

Behaves like normal flow until a scroll threshold is reached, then sticks within its scrolling/containing context.

### Interview Answer

> `static` is the default, `relative` keeps the element in flow while allowing offsets and establishing a positioning context, `absolute` removes it from normal flow, `fixed` is generally viewport-based, and `sticky` switches between normal flow and a stuck position based on scrolling.

---

# 8. `z-index` and Stacking Context

### Q: Why doesn't `z-index: 999999` always work?

Because `z-index` is affected by stacking contexts.

A child with a huge `z-index` cannot simply escape its parent's stacking context and appear above every other stacking context.

Common stacking-context creators include:

- Positioned elements with a non-auto `z-index`
- `position: fixed`
- `position: sticky`
- `opacity < 1`
- `transform`
- `filter`
- Certain containment properties
- `isolation: isolate`

### Interview Answer

> `z-index` doesn't operate globally. Elements are painted within stacking contexts, and a child with a huge `z-index` can still be behind another stacking context created by an ancestor or sibling.

---

# 9. Flexbox

### Q: What is Flexbox?

Flexbox is a one-dimensional layout system used to arrange elements along a row or column.

```css
.container {
  display: flex;
}
```

Main axis is controlled by:

```css
flex-direction
```

Common properties:

```text
Container:
display
flex-direction
justify-content
align-items
align-content
flex-wrap
gap

Item:
flex
flex-grow
flex-shrink
flex-basis
align-self
order
```

### Interview Answer

> Flexbox is a one-dimensional layout system designed to distribute and align items along a main axis and cross axis.

---

# 10. `justify-content` vs `align-items`

With:

```css
.container {
  display: flex;
  flex-direction: row;
}
```

```text
justify-content
→ Main axis → Horizontal

align-items
→ Cross axis → Vertical
```

If:

```css
flex-direction: column;
```

then:

```text
justify-content → Vertical
align-items     → Horizontal
```

### Interview Answer

> `justify-content` controls alignment along the main axis, while `align-items` controls alignment along the cross axis.

---

# 11. What does `flex: 1` mean?

This:

```css
.item {
  flex: 1;
}
```

is commonly treated as shorthand for:

```css
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

It lets flex items grow and shrink while distributing available space from a zero basis.

### Interview Answer

> `flex: 1` is shorthand for `flex-grow: 1`, `flex-shrink: 1`, and a zero flex basis. It is commonly used to make flex items share available space.

---

# 12. CSS Grid

### Q: What is CSS Grid?

CSS Grid is a two-dimensional layout system that controls rows and columns.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

Important properties:

```text
grid-template-columns
grid-template-rows
grid-column
grid-row
grid-template-areas
gap
```

### Interview Answer

> CSS Grid is a two-dimensional layout system that provides control over both rows and columns.

---

# 13. Grid vs Flexbox

### Flexbox

Best for one-dimensional layouts: row or column.

Examples:

- Navbar
- Button groups
- Horizontal cards
- Aligning items

### Grid

Best for two-dimensional layouts: rows and columns.

Examples:

- Dashboard
- Complex page layouts
- Image galleries
- Product grids

### Interview Answer

> I use Flexbox when I'm primarily arranging elements along one axis, and Grid when I need control over both rows and columns. They can also be used together.

---

# 14. CSS Units

## `px`

CSS pixel unit.

```css
font-size: 16px;
```

## `%`

Usually relative to a containing context.

```css
width: 50%;
```

## `em`

Relative to the relevant font-size context, depending on the property. It can compound through nesting.

## `rem`

Relative to the root element's font size.

If root font size is 16px:

```text
1rem = 16px
1.5rem = 24px
```

## `vh` and `vw`

Relative to viewport height and width.

```css
height: 100vh;
width: 100vw;
```

### Interview Answer

> `px` is a CSS pixel unit, `%` is relative to a containing context, `em` is relative to the relevant font sizing context, `rem` is relative to the root font size, and `vh`/`vw` are based on viewport dimensions.

---

# 15. Pseudo-class vs Pseudo-element

## Pseudo-class

Represents a state or condition.

```css
:hover
:focus
:active
:checked
:nth-child()
:first-child
```

## Pseudo-element

Targets a part of an element or creates generated content.

```css
::before
::after
::first-letter
::first-line
::placeholder
```

### Easy Way to Remember

```text
Pseudo-class
→ State

Pseudo-element
→ Part / generated content
```

---

# 16. `::before` and `::after`

They create generated content associated with an element.

```css
.title::before {
  content: "★ ";
}
```

Common uses:

- Decorative icons
- Overlays
- Borders
- Visual effects

Important content should generally be in the HTML rather than only generated with pseudo-elements.

---

# 17. Margin Collapsing

### Q: What is margin collapsing?

Vertical margins between certain block elements can collapse into a single margin instead of adding together.

```css
.first {
  margin-bottom: 30px;
}

.second {
  margin-top: 20px;
}
```

In a typical collapsing situation:

```text
max(30, 20) = 30px
```

It can occur between adjacent block siblings and in certain parent/child and empty-block situations.

It generally concerns vertical margins in normal block flow, not flex/grid items.

### Interview Answer

> Margin collapsing happens when certain vertical margins combine into a single margin instead of adding together. It commonly occurs between block-level elements in normal flow.

---

# 18. `nth-child` vs `nth-of-type`

Consider:

```html
<div>
  <p>One</p>
  <span>Two</span>
  <p>Three</p>
</div>
```

## `nth-child()`

Counts all element children.

```css
p:nth-child(2) {
  color: red;
}
```

This does not match because the second child is `<span>`.

## `nth-of-type()`

Counts only elements of the same type.

```css
p:nth-of-type(2) {
  color: red;
}
```

This matches the second `<p>`.

### Easy Way to Remember

```text
nth-child
→ Count all children

nth-of-type
→ Count same element type
```

---

# 19. Overflow

Controls what happens when content exceeds an element's box.

```css
.container {
  overflow: hidden;
}
```

Common values:

```text
visible
hidden
scroll
auto
clip
```

`hidden` clips overflow.

`auto` provides scrolling when needed.

---

# 20. Why `position: sticky` Sometimes Doesn't Work

Example:

```css
.header {
  position: sticky;
  top: 0;
}
```

Potential reasons:

1. No threshold such as `top: 0`.
2. The scrolling context isn't what you expect.
3. An ancestor has overflow/scrolling behavior that changes the sticky containing context.
4. There isn't enough scrollable space.
5. Layout constraints prevent the expected sticky behavior.

### Interview Answer

> `position: sticky` depends on its scrolling and containing context. I first check that a threshold such as `top: 0` is defined, then inspect ancestor overflow and whether the element has enough scrollable space.

---

# 21. CSS Variables / Custom Properties

```css
:root {
  --primary-color: #2563eb;
  --spacing: 16px;
}
```

Use them:

```css
.button {
  background: var(--primary-color);
  padding: var(--spacing);
}
```

They can be changed dynamically:

```javascript
document.documentElement.style.setProperty(
  "--primary-color",
  "red"
);
```

Benefits:

- Reusability
- Theming
- Maintainability
- Runtime modification

---

# 22. Responsive Design

Use:

- Flexible layouts
- Flexbox
- CSS Grid
- Relative units
- Media queries
- Responsive images
- Mobile-first design

Example:

```css
.container {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

# 23. Mobile-First CSS

Start with smaller screens and progressively enhance for larger screens.

```css
.card {
  width: 100%;
}

@media (min-width: 768px) {
  .card {
    width: 50%;
  }
}
```

Benefits:

- Simpler CSS
- Better prioritization of essential content
- Easier responsive scaling

---

# 24. Transitions vs Animations

## Transition

Used to smoothly transition between states.

```css
.button {
  transition: background-color 0.3s;
}

.button:hover {
  background-color: blue;
}
```

## Animation

Uses `@keyframes` and can have multiple stages.

```css
@keyframes slide {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100px);
  }
}

.box {
  animation: slide 1s;
}
```

### Easy Way to Remember

```text
Transition
→ State A → State B

Animation
→ Multiple keyframes
```

---

# 25. `transform` vs Changing Position

For animations, prefer:

```css
transform: translateX(100px);
```

over repeatedly changing layout-related properties such as:

```css
left: 100px;
```

Transforms can often be handled without repeatedly recalculating layout, depending on the situation.

### Interview Answer

> For animations, I generally prefer `transform` and `opacity` because they can often be animated without repeatedly recalculating layout, which can improve performance.

---

# 26. `!important`

```css
.title {
  color: red !important;
}
```

It increases declaration priority but can make CSS harder to override and maintain.

### Interview Answer

> I avoid `!important` in normal application code because it makes the cascade harder to reason about. I use it only when there is a specific reason, such as overriding third-party styles where other approaches aren't practical.

---

# 27. `calc()`, `min()`, `max()`, `clamp()`

## `calc()`

```css
width: calc(100% - 40px);
```

Performs calculations.

## `min()`

```css
width: min(100%, 1200px);
```

Uses the smaller value.

## `max()`

```css
width: max(300px, 50%);
```

Uses the larger value.

## `clamp()`

```css
font-size: clamp(1rem, 2vw, 2rem);
```

```text
Minimum → Preferred → Maximum
```

### Interview Answer

> `calc()` performs calculations, `min()` chooses the smaller value, `max()` chooses the larger value, and `clamp()` defines a minimum, preferred, and maximum value. `clamp()` is especially useful for responsive sizing.

---

# 28. CSS Stacking Context

A stacking context is an isolated group of elements painted together according to their stacking order.

Common creators include:

```text
position + non-auto z-index
position: fixed
position: sticky
opacity < 1
transform
filter
isolation: isolate
```

### Key Point

If Parent A is below Parent B in stacking order, increasing a child's `z-index` inside Parent A cannot make that child escape the parent's stacking context and jump above Parent B's stacking context.

---

# 29. CSS Performance

### Q: How do you improve CSS performance?

- Remove unused CSS
- Minify CSS
- Avoid unnecessarily complex selectors
- Reduce CSS bundle size
- Use critical CSS appropriately
- Avoid expensive animations
- Prefer `transform` and `opacity` for animations
- Use efficient responsive strategies
- Split styles when appropriate

For animations, prefer:

```css
transform
opacity
```

over repeatedly animating layout-heavy properties such as:

```css
width
height
top
left
margin
```

when possible.

---

# 30. Container Queries

Traditional media queries respond to the viewport.

Container queries allow a component to respond to the size of its container.

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 500px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

### Interview Answer

> Media queries make decisions based on the viewport, while container queries allow a component to adapt based on the size of its containing element.

---

# 31. Quick Interview Revision

## Box Model

```text
Content
   ↓
Padding
   ↓
Border
   ↓
Margin
```

## box-sizing

```text
content-box
→ width = content only

border-box
→ width = content + padding + border
```

## Specificity

```text
!important
↓
Inline
↓
ID
↓
Class / attribute / pseudo-class
↓
Element / pseudo-element
```

## Display

```text
block
→ New line

inline
→ Same line

inline-block
→ Same line + width/height
```

## Visibility

```text
display: none
→ Removed from layout

visibility: hidden
→ Invisible but space remains

opacity: 0
→ Transparent but space remains
```

## Position

```text
static
→ Default

relative
→ Normal flow + offset

absolute
→ Removed from flow

fixed
→ Generally viewport-based

sticky
→ Sticks within scrolling context
```

## Flexbox

```text
justify-content
→ Main axis

align-items
→ Cross axis
```

## Grid vs Flexbox

```text
Flexbox
→ One-dimensional

Grid
→ Two-dimensional
```

## Units

```text
px
→ CSS pixel

%
→ Relative

em
→ Relative to relevant font sizing context

rem
→ Root font size

vh
→ Viewport height

vw
→ Viewport width
```

## Pseudo

```text
Pseudo-class
→ State

:hover
:focus
:nth-child()

Pseudo-element
→ Part / generated content

::before
::after
::first-letter
```

## Margin Collapse

```text
30px + 20px
       ↓
   30px
```

in typical vertical margin-collapsing situations.

## nth-child vs nth-of-type

```text
nth-child
→ Counts all children

nth-of-type
→ Counts same element type
```

## Transition vs Animation

```text
Transition
→ State A → State B

Animation
→ Multiple keyframes
```

## Responsive CSS

```text
Flexible layout
+
Flexbox / Grid
+
Relative units
+
Media queries
+
Mobile-first approach
```

## clamp()

```css
font-size: clamp(1rem, 2vw, 2rem);
```

```text
minimum
   ↓
preferred
   ↓
maximum
```

---

# 32. Top 15 CSS Questions to Master

For a 3.5+ year React/Next.js Frontend Engineer interview:

```text
1.  CSS Box Model
2.  box-sizing
3.  CSS Specificity
4.  Inheritance
5.  display: block / inline / inline-block
6.  display: none / visibility / opacity
7.  position: relative / absolute / fixed / sticky
8.  z-index and stacking context
9.  Flexbox
10. justify-content vs align-items
11. flex: 1
12. Grid vs Flexbox
13. px vs % vs em vs rem
14. Margin collapsing
15. nth-child vs nth-of-type
```

---

# 🔥 Tricky CSS Interview Questions

```text
Why doesn't z-index: 999999 work?

Why does position: absolute use a particular parent?

Why does position: sticky not work?

What exactly does flex: 1 mean?

Why is height: 100% not working?

Why does margin collapse?

What creates a stacking context?

Why can width: 100% cause horizontal scrolling?

What is the difference between em and rem?

When would you use Grid instead of Flexbox?

Why use transform instead of top/left for animations?

What is the difference between opacity: 0 and display: none?

What is the difference between nth-child and nth-of-type?

What is the difference between media queries and container queries?

How would you optimize CSS performance?
```

---

# Final Interview Strategy

For CSS interviews, don't just memorize property definitions.

Be able to explain:

```text
What?
 ↓
Why?
 ↓
When?
 ↓
Example
 ↓
Common problem
 ↓
How to fix it
```

For example, don't just say:

> `z-index` controls which element appears on top.

A stronger answer is:

> `z-index` controls stacking order within stacking contexts. A high `z-index` doesn't necessarily place an element above everything because the element is still constrained by its stacking context.

That level of explanation is suitable for a 3–5 year Frontend Engineer interview.
