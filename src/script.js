// ******************************  DEFINE YOUR "STABLE" VARIABLES HERE ****************************** //
const formElement = document.querySelector('.new-note-form');
const noteContentElement = document.querySelector('.note-content');
const notesUlElement = document.querySelector('.notes-list');

// ****************************** TEMPLATES ****************************** //

const noteLiTemplate = noteObj => {
  return `
        <li class="note-li" data-id=${noteObj.id}> ${noteObj.title} </li>
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
  newCommentForm.dataset.id = noteObj.id;
  newCommentForm.innerHTML = `
    <input type="text" name="content" placeholder="Comment on this note"/>
    <input type="submit">
  `;

  const commentsUl = document.createElement('UL');
  noteObj.comments.forEach(comment => {
    commentsUl.innerHTML += `<li> ${comment.content} </li>`;
  });
  commentSection.append(newCommentForm, commentsUl);
  noteContentElement.append(commentSection);
  // Event listener to handle new comment
  newCommentForm.addEventListener('submit', e => {
    e.preventDefault();
    handleNewComment(e, commentsUl);
    e.target.reset();
  });

  return noteContentElement;
};

// ****************************** HELPERS  ****************************** //

const handleNewComment = (e, commentsUl) => {
  const noteId = e.target.dataset.id;
  const noteContent = e.target.content.value;
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ note_id: noteId, content: noteContent }),
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

const NOTES_URL = 'http://localhost:3000/notes';
const LIKES_URL = 'http://localhost:3000/likes';
const COMMENTS_URL = 'http://localhost:3000/comments';

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
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(noteData),
  };
  return fetch(NOTES_URL, config).then(r => r.json());
};

// /////////////////////////////////////// DELETE A NOTE (Delete) ///////////////////////////////////////
// const deleteNoteFromDB = noteId => {
//   // THIS WILL NOT RETURN ANYTHING, IT WILL SEND A DELETE REQUEST TO THE BACKEND\
//   const config = {
//     method: 'DELETE',
//   };
//   fetch(NOTES_URL + '/' + noteId, config);
// };
// /////////////////////////////////////// UPDATE A NOTE (Update) ///////////////////////////////////////
// const updateNoteToDB = noteData => {
//   // THIS WILL RETURN A PROMISE (UPDATED SINGLE NOTE OBJECT) THAT WE CAN USE FOR DOM MANIPULATION
//   const config = {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify(noteData),
//   };
//   return fetch(NOTES_URL + '/' + noteId, config).then(r => r.json());
// };

/////////////////////////////////////// GET ONE NOTE (Show) ///////////////////////////////////////
const getASingleNoteFromDB = noteId => {
  return fetch(NOTES_URL + '/' + noteId).then(r => r.json());
};

/////////////////////////////////////// LIKE A NOTE ///////////////////////////////////////
const createNewLikeToDB = noteId => {
  console.log('id', noteId);
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ note_id: noteId }),
  };
  return fetch(LIKES_URL, config).then(r => r.json());
};

// *************************************  EVENTS ************************************* //

/////////////////////////////////////// GET ALL NOTES ///////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
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
  const noteData = {
    title: e.target.title.value,
    content: e.target.content.value,
  };

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
      noteContentElement.innerHTML = '';
      mainNoteTemplate(noteObj);
    });
  }
});

/////////////////////////////////////// LIKE A NOTE ///////////////////////////////////////

noteContentElement.addEventListener('click', e => {
  if (e.target.className === 'like') {
    const noteId = e.target.dataset.id;
    createNewLikeToDB(noteId).then(updatedNote => {
      noteContentElement.innerHTML = '';
      mainNoteTemplate(updatedNote);
    });
  }
});

/////////////////////////////////////// ADD A COMMENT ///////////////////////////////////////

/// since the form is conditionally on the DOM, the eventListener is initialized when the noteContentForm is created. Check the 'handleNewComment' helper method on line 49
