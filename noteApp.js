const fs = require('fs');
const readlineSync = require('readline-sync');

// let notes = [
//     {
//         title: 'Shopping List',
//         body: 'Buy milk and bread',
//         time_added: '2023-08-01T08:30:00Z'
//     },
//     {
//         title: 'Homework',
//         body: 'Finish math assignment',
//         time_added: '2023-08-01T09:00:00Z'
//     }
// ]

// Reading the JSON file
let data = fs.readFileSync('./notes.json', 'utf-8');
notes = JSON.parse(data);

function displayMenu() {
  console.log('Menu:');
  console.log('1. Add a note');
  console.log('2. List all notes');
  console.log('3. Read a note');
  console.log('4. Delete a note');
  console.log('5. Update a note');
  console.log('6. Exit');

  const choice = readlineSync.question('Enter your choice: ');

  switch (choice) {
    case '1':
      addNote();
      break;
    case '2':
      listNotes();
      break;
    case '3':
      readNote();
      break;
    case '4':
      deleteNote();
      break;
    case '5':
      updateNote();
      break;
    case '6':
      console.log('Exiting the Note-taking App. Goodbye!');
      break;
    default:
      console.log('Invalid choice. Please select a valid option.');
      displayMenu(); // Redisplay the menu for a valid choice
  }
}

function addNote() {
  const title = readlineSync.question('Enter note title: ');
  const body = readlineSync.question('Enter note body: ');

  let note = {
    title,
    body,
    time_added: new Date().toISOString()
  };
  notes.push(note);
  saveNotes();
  console.log('Note added successfully!');
  displayMenu();
}

function listNotes() {
  console.log('All notes: ');
  notes.forEach((note, index) => {
    console.log(`${index + 1}. Title: ${note.title}`);
    console.log(`   Body: ${note.body}`);
    console.log(`   Added on: ${note.time_added}`);
  });
  displayMenu();
}

function readNote() {
  const title = readlineSync.question('Enter note title: ');
  const foundNote = notes.find((note) => note.title === title);
  if (foundNote) {
    console.log(`Title: ${foundNote.title}`);
    console.log(`Body: ${foundNote.body}`);
    console.log(`Added on: ${foundNote.time_added}`);
  } else {
    console.log('Note not found.');
  }
  displayMenu();
}

function deleteNote() {
  const title = readlineSync.question('Enter note title to delete: ');
  const noteIndex = notes.findIndex((note) => note.title === title);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
    console.log('Note deleted successfully!');
  } else {
    console.log('Note not found.');
  }
  displayMenu();
}

function updateNote() {
  const title = readlineSync.question('Enter note title to update: ');
  const noteIndex = notes.findIndex((note) => note.title === title);
  if (noteIndex !== -1) {
    const body = readlineSync.question('Enter new note body: ');
    notes[noteIndex].body = body;
    saveNotes();
    console.log('Note updated successfully!');
    displayMenu();
  } else {
    console.log('Note not found.');
    displayMenu();
  }
}

function saveNotes() {
  fs.writeFileSync('./notes.json', JSON.stringify(notes));
}

// Start the application
console.log('Welcome to the Note-taking App!');
displayMenu();
