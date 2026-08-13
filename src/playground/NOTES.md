# FE-05: Accessible Component Fundamentals

## Comparison: Manual Implementation vs. shadcn/ui (Radix UI)

After building the Modal, Tabs, and Disclosure components manually and strictly adhering to W3C ARIA practices, I compared my implementation against the generated components from `shadcn/ui` (which are powered by Radix UI primitives). 

Here are the concrete gaps and edge cases that `shadcn/ui` handled which my manual version missed:

### 1. Scroll Locking (Body Pointer Events)
**My version:** When the modal opened, the background remained scrollable. If the user scrolled the mouse wheel, the background content moved, which is visually confusing.
**shadcn/ui:** Automatically applies `pointer-events: none` and `overflow: hidden` to the `<body>` element when the dialog is open, entirely preventing background scrolling and interactions.

### 2. Outside Click Detection (Dismissable)
**My version:** I only handled the `Escape` key and the explicit "Close" button. Clicking on the dark overlay (backdrop) did nothing.
**shadcn/ui:** Handles pointer down outside the bounds of the dialog content, automatically dismissing the modal and returning focus to the trigger element without needing custom event listeners.

### 3. Screen Reader Hidden Elements (`aria-hidden`)
**My version:** The focus trap kept keyboard users inside the modal, but screen readers could potentially still read background content if not properly configured.
**shadcn/ui:** Uses `aria-hidden="true"` on the root application container while the modal is open, ensuring that screen readers completely ignore the background content and solely focus on the dialog tree.

### 4. Roving Tabindex Edge Cases in Tabs
**My version:** Implemented basic Left/Right arrow navigation. However, if the tablist contained disabled tabs, my simple math `(index + 1) % length` would focus on a disabled element.
**shadcn/ui:** Radix UI's roving tabindex correctly skips over `disabled` tab triggers during directional keyboard navigation.