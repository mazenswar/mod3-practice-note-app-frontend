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
    <h2>${'Title'}</h2>
    <p>${'Content'}</p>
    <button class="like" data-id=${noteObj.id}>Like <span>${
    noteObj.likes.length
  }</span></button>
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
    // DO SOMETHING
  });
  commentSection.append(newCommentForm, commentsUl);
  noteContentElement.append(commentSection);
  // Event listener to handle new comment
  newCommentForm.addEventListener('submit', e => {
    handleNewComment(e, commentsUl);
    e.target.reset();
  });

  return noteContentElement;
};

// ****************************** HELPERS  ****************************** //

const handleNewComment = (e, commentsUl) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({}),
  };
  fetch(COMMENTS_URL, config)
    .then(r => r.json())
    .then(commentObj => {
      const commentLi = document.createElement('LI');
      commentLi.textContent = commentObj.content;
      commentsUl.append(commentLi);
    });
};

// ****************************** FETCH  ****************************** //

///////////////////////////////////// GET ALL NOTES FROM THE API (Read) /////////////////////////////////////
const getNotesFromDB = () => {
  // THIS WILL RETURN A PROMISE (ARRAY OF OBJECTS) THAT WE CAN USE FOR DOM MANIPULATION
  return fetch(NOTES_URL).then(r => r.json());
};
/////////////////////////////////////// CREATE A NEW NOTE (Create) ///////////////////////////////////////
const createNewNoteToDB = noteData => {
  // THIS WILL RETURN A PROMISE (SINGLE NOTE OBJECT) THAT WE CAN USE FOR DOM MANIPULATION
  const config = {
    method: 'POST',
    headers: {
      // Add Code here
    },
    body: JSON.stringify(noteData),
  };
  return fetch(NOTES_URL, config).then(r => r.json());
};

// /////////////////////////////////////// DELETE A NOTE (Delete) ///////////////////////////////////////

// BONUS

// /////////////////////////////////////// UPDATE A NOTE (Update) ///////////////////////////////////////

// BONUS

/////////////////////////////////////// GET ONE NOTE (Show) ///////////////////////////////////////
const getASingleNoteFromDB = noteId => {
  return fetch(NOTES_URL + '/' + noteId).then(r => r.json());
};

/////////////////////////////////////// LIKE A NOTE ///////////////////////////////////////
const createNewLikeToDB = noteId => {
  console.log('id', noteId);
  const config = {
    // Add code
  };
  return fetch(LIKES_URL, config).then(r => r.json());
};

// *************************************  EVENTS ************************************* //

/////////////////////////////////////// GET ALL NOTES ///////////////////////////////////////
document.addEventListener('', () => {
  // When the DOM Loads, go to my API and grab all the notes
  getNotesFromDB().then(notesArr => {
    // We now have an array of notes
    // the next step is use them to put something on the DOM
    notesArr.forEach(note => {
      notesUlElement.innerHTML += noteLiTemplate(note);
    });
  });
  // END OF DOMContentLoaded EventHandler
});

/////////////////////////////////////// CREATING A NEW NOTE ///////////////////////////////////////
formElement.addEventListener('submit', e => {
  e.preventDefault();
  // Add code here
  const noteData = {};
  createNewNoteToDB(noteData).then(note => {
    notesUlElement.innerHTML = noteLiTemplate(note) + notesUlElement.innerHTML;
    mainNoteTemplate(note);
    e.target.reset();
  });
});

/////////////////////////////////////// SHOW MAIN NOTE ///////////////////////////////////////

notesUlElement.addEventListener('click', e => {
  if (e.target.className === 'note-li') {
    const noteId = e.target.dataset.id;
    getASingleNoteFromDB(noteId).then(noteObj => {
      mainNoteTemplate(noteObj);
    });
  }
});

/////////////////////////////////////// LIKE A NOTE ///////////////////////////////////////

noteContentElement.addEventListener('click', e => {
  if (e.target.className === 'like') {
    const noteId = e.target.dataset.id;
    createNewLikeToDB(noteId).then(updatedNote => {
      mainNoteTemplate(updatedNote);
    });
  }
});

/////////////////////////////////////// ADD A COMMENT ///////////////////////////////////////

/// since the form is conditionally on the DOM, the eventListener is initialized when the noteContentForm is created. Check the 'handleNewComment' helper method on line 49
