# Things to Consider

### API Endpoints

Create a new note

`POST http://localhost:3000/notes`

Read(get) All Notes

`GET http://localhost:3000/notes`

Update a single note

`PATCH http://localhost:3000/notes/:id`

Delete a single note

`DELETE http://localhost:3000/notes/:id`

Create a comment

`POST http://localhost:3000/comments`

Create a like

`POST http://localhost:3000/likes`

### Confused about which API endpoint to use in your fetch?

### Things to consider:

1. Is the API restful?
2. What does the API documentation say?
3. What are the models/relationships on the backend?

### How do I debug my fetch?

1. Are there any errors in the console?
2. Are there any "red" requests under your network tab? if so, what does the response say?
3. Trying to POST/PATCH/DELETE but my request says that it's a GET request. (Check you headers and make sure there are no spelling mistakes)

### I have my data but I am not sure how to put it on the dom:

1. The first step is deciding where you want to display your data.
2. What data type are you dealing with (Object or Array)? Do you need to iterate?
3. What kind of DOM element do you want to hold your data? (`<div>/<li>/<p>/etc`). Does that element already exist on the DOM or do you need to create it?
4. Decide whether you want to use a string template to create that element(s) or if you want to use `document.createElement(<tagName>)` and set attributes programmatically
5. Where on the DOM do you want this element to live? What element are you appending/prepending to / What element's innerHTML are you manipulating (Do you want to add to its content or replace it?)

# Deliverables

1. When the app loads, the user should see a list of note titles in `<ul class="notes-list"></ul>`
2. When a user clicks on a note title in `<ul class="notes-list"></ul>`, the clicked note's details should show in `<div class="note-content"></div>`
3. A user should be able to create a new note using `<form class="new-note-form"></form>`
4. A user should be able to like a note.
5. A user should be able to comment on a note.

# Bonus

1. Add an update feature that lets the user update the note title and/or the content.
2. Add a delete feature to delete a note.

## END PRODUCT

![End Product](./note-app.gif)
