

## Project Summary

### Part 1:

I created the sidebar using create-react-app as it allows easy project templating without the need for boilerplate. I chose to use [material-ui](https://github.com/mui-org/material-ui), because it is wildly popular and I wanted to gain some experience using it. Compared to Bootstrap, material-ui embraces more CSS-in-JS. In a larger project, I can see the usefulness in project wide styleguide implementation. 

### Part 2: 

The vanilla javascript for Parts 2-5 are located in /public/files.js. As React has complete control of everything under it's root DOM node, I placed the root node for files.js as a sibling to the React app root node. I considered using an iframe, however I wanted to challenge myself with document styling and move away from the broadcast pattern that iframes use to communicate. I expose a couple of parts of `files.js` to the window, and there are hooks in the routing that execute and quit the main thread on the script. All of the rendering and events are pure JavaScript.


The file navigator allows for 1 level of file depth. I store the root level and directory levels in arrays of objects (Collections). All fields sort, however `Date Modified` is not formatted correctly, so it does not sort properly. Given a production level project, I would use a solid external library like [date-fns](https://date-fns.org/) for sorting and displaying proper format.

### Part 3:

To solve the sorting on column header click, I extended Array.sort() (which uses merge sort according to MDN). I attached event listeners to the `<th>` elements, where they in-place sort the Collections for files and folders. The elements are cleared from the dom and rerender on each sort.

### Part 4:

As per the guidelines, I used [fuse.js](https://fusejs.io/) for fuzzy search. I attached a `keyup` event handler which watches user keystrokes in the search bar.

### Conclusion:

It has been too long since I've done direct DOM manipulation in Vanilla JS, as there are many UI libraries that make that layer of development much more rapid. I feel like a succeeded in almost all of the criteria for the exam. As I use [redux](https://redux.js.org/) in my daily development, I'm really itching to go back and clean up `files.js`, to follow a more organized state pattern. 

## To get started:

### `npm install`
### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

Open [http://localhost:4000/files](http://localhost:4000/files) to use the vanilla js file UI.

-The only thing that may not be obvious is you have to press 'Root /' to go to root level or cancel a search.
