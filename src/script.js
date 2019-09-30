// ******************************  DEFINE YOUR "STABLE" VARIABLES HERE ****************************** //
const formElement = document.querySelector('.new-note-form');
const noteContentElement = document.querySelector('.note-content');
const notesUlElement = document.querySelector('.notes-list');

// ******************************  API CONSTANTS ****************************** //

const NOTES_URL = 'http://localhost:3000/notes';
const LIKES_URL = 'http://localhost:3000/likes';
const COMMENTS_URL = 'http://localhost:3000/comments';

// ****************************** TEMPLATES ****************************** //

const noteLiTemplate = noteObj => {
  return `
        <li class="note-li"> ${noteObj.title} </li>
    `;
};

const mainNoteTemplate = noteObj => {
  // Note
  noteContentElement.innerHTML = `
    <h2>${noteObj.title}</h2>
    <p>${noteObj.content}</p>
    <button class="like" data-id=${noteObj.id}>Like <span>${noteObj.likes.length}</span></button>
  `;
  // Comment Section
  const commentSection = document.createElement('SECTION');
  commentSection.className = 'comments-section';
  const newCommentForm = document.createElement('FORM');
  newCommentForm.innerHTML = `
    <input type="text" name="content" placeholder="Comment on this note"/>
    <input type="submit">
  `;

  // Comments UL
  const commentsUl = document.createElement('UL');
  noteObj.comments.forEach(comment => {
    commentLi = document.createElement('LI');
    commentLi.textContent = comment.content;
    commentsUl.append(commentLi);
  });
  commentSection.append(newCommentForm, commentsUl);
  noteContentElement.append(commentSection);
  return noteContentElement;
};
