# Machine Coding Questions (Frontend / React)

Live "build this from scratch" tasks — typically 45–120 minutes, evaluated on component reusability, state management, edge-case handling, and performance.

## Data Display & Lists
- Accordion (single + nested + grouped) — dynamically rendered from a JSON structure
  (e.g. `{ id, name, strings[] }`), with expand/collapse on header click
- Data table that fetches from an API and displays results
- Render millions of rows efficiently in React
- Virtualized list built from scratch, without external libraries (DOM recycling, scroll throttling)
- Implement virtualization in vanilla JavaScript
- Sortable/paginated accessible data table
- File explorer / file tree view with nested create-folder/create-file support
- Nested comment system
- Grid component, and an N×N grid with incremental per-cell updates on click

## Forms & Input
- Multi-step / multi-stepper form
- Two-step login form
- Dynamic form generated from a JSON config
- Switch-case component
- Feature flag component
- Search bar with debounced API calls
- Search with autocomplete / autosuggestion
- Search with pagination

## Navigation, Layout & Interaction
- Tab component (including lazy-loaded tab content)
- Modal component (from scratch, no library), including a "modal with priority" / modal management system
- Nested / stacked modals
- Toggle switch
- Stacked snackbar
- Drag-and-drop sortable Todo list
- Editable Todo list with tabs and item expiry time
- Scroll indicator
- File tree with drag-and-drop

## Media, Animation & Visual
- Responsive image/content slideshow gallery
- Image carousel (auto-rotating)
- Lightbox / modal image gallery
- Image comparison slider
- Preview a selected color from swatches
- Preview a zoomed image on hover
- Animate elements in sequence
- Draw a circle on click with undo/redo/reset
- Undo a grid-cell click with a delay
- Change the color of squares in the order clicked
- Detect overlapping circles

## Async, State & Real-Time
- Todo app with add/edit/delete, optimized for minimal re-renders
- Counter with start/pause/reset
- Stopwatch (start/stop/reset, live timer)
- Timer state that persists across page navigation
- Task queue with controlled concurrency (run up to K tasks in parallel, queue the rest,
  support success/error callbacks and custom executors for logging/retries)
- Batch API calls in sequence
- Infinite scroll (fetch in batches, handle race conditions)
- Capture which product is visible in the viewport when the user stops scrolling
- Typing test with invalid-character highlighting
- Typing effect component
- Highlight text on selection
- Time in human-readable format ("2 hours ago")

## Auth & Real-World Systems
- Authentication using JWT and OAuth
- Modal management system
- Calendar application (like Google Calendar)
- Website walkthrough / product-tour assistant

## Component Library Basics
- Reusable select/dropdown component with search
- Reusable select supporting multi-select
- Number increment counter
- Spinner with CSS only
