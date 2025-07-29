const noteDialog = document.getElementById('note-dialog');
const noteTitle = document.getElementById('title');
const notecontent = document.getElementById('content');
const notesContainer = document.querySelector('main');
const AllnotesContainer = document.getElementById('all-notes-container')
let notes = [];
let EditNoteId = null;

function getNotes() {
    const getnote = localStorage.getItem('Notes');
    return getnote? JSON.parse(getnote) : [];
}
function Noteform(e) {
    e.preventDefault();
    const titleValue = noteTitle.value.trim();
    const contentValue = notecontent.value.trim();
    if (EditNoteId) {
       const notesToEdit = notes.findIndex(note => note.id === EditNoteId);
       notes[notesToEdit] = {
        ...notes[notesToEdit],
        title: titleValue,
        content: contentValue
       }
    } else if (titleValue.length > 0 && contentValue.length > 0) {
    notes.unshift({
        id: noteDialogid(),
        title: titleValue,
        content: contentValue,
    })
}

    closeDialog();
    saveNotes();
    renderNotes();
}
function noteDialogid() {
    return Date.now().toString();
}
function saveNotes() {
    localStorage.setItem('Notes', JSON.stringify(notes));
}
function deletenote(noteId) {
 notes = notes.filter(note => note.id != noteId);
 renderNotes();
 saveNotes()
}
function openDialog(noteId = null) {
    const dialogHead = document.querySelector('.dialog-heading');
    if (noteId) {
        const EditNote = notes.find(note => noteId === note.id)
        EditNoteId = noteId
        dialogHead.textContent = `Edit Note`;
        noteTitle.value = EditNote.title;
        notecontent.value = EditNote.content;
    } else {
        noteId = null
        dialogHead.textContent = `Create New Note`;
        noteTitle.value = '';
        notecontent.value = '';
    }
    noteDialog.showModal()
    noteTitle.focus()
}
function closeDialog() {
    noteDialog.close();
}
function renderNotes() {
        const EmptyNotesContainer = document.getElementById('empty-content-wrapper');
    if (notes.length === 0) {
        AllnotesContainer.innerHTML = ''
        EmptyNotesContainer.innerHTML = `
        <p id="empty-content">
            <svg width="324" height="324" viewBox="0 0 324 324" id="notes-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.3452 296.069H284.724V27.9311H33.3452V296.069Z" fill="#CC8BD2" fill-opacity="0.22"/>
    <path d="M284.724 50.2757V296.069H38.9311V318.414H307.069V50.2757H284.724Z" fill="#783392" fill-opacity="0.28"/>
    <path d="M38.9311 318.414H290.31V296.069H38.9311V318.414Z" fill="#310F3D" fill-opacity="0.5"/>
    <path d="M284.42 307H16.5803C13.232 307 11 304.72 11 301.3V27.7003C11 24.28 13.232 22 16.5803 22H284.42C287.768 22 290 24.28 290 27.7003V301.3C289.999 304.72 287.767 307 284.42 307ZM22.1599 295.599H278.839V33.4005H22.1599V295.599Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M307.069 324H38.9311C35.5791 324 33.3446 321.766 33.3446 318.414V296.069C33.3446 292.717 35.5791 290.482 38.9311 290.482H279.138V50.2757C279.138 46.9237 281.372 44.6892 284.724 44.6892H307.069C310.421 44.6892 312.655 46.9237 312.655 50.2757V318.414C312.655 321.766 310.421 324 307.069 324ZM44.5175 312.828H301.483V55.8622H290.311V296.069C290.311 299.421 288.076 301.655 284.724 301.655H44.5175V312.828Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M139.483 78.2068C127.193 78.2068 117.138 68.1514 117.138 55.8622V22.3446C117.138 10.0548 127.194 0 139.483 0C151.772 0 161.828 10.0554 161.828 22.3446C161.828 25.6966 159.593 27.9311 156.241 27.9311C152.889 27.9311 150.655 25.6966 150.655 22.3446C150.655 16.2 145.627 11.1723 139.482 11.1723C133.338 11.1723 128.31 16.2 128.31 22.3446V55.8622C128.31 62.0068 133.338 67.0345 139.482 67.0345C145.627 67.0345 150.655 62.0068 150.655 55.8622C150.655 52.5101 152.889 50.2757 156.241 50.2757C159.593 50.2757 161.828 52.5101 161.828 55.8622C161.828 68.152 151.772 78.2068 139.483 78.2068Z" fill="#D77BFF" fill-opacity="0.46"/>
    <path d="M228.862 122.897H206.518C203.166 122.897 200.931 120.662 200.931 117.31C200.931 113.958 203.166 111.724 206.518 111.724H228.862C232.214 111.724 234.449 113.958 234.449 117.31C234.449 120.662 232.214 122.897 228.862 122.897Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M184.172 122.897H145.069C141.717 122.897 139.482 120.662 139.482 117.31C139.482 113.958 141.717 111.724 145.069 111.724H184.172C187.524 111.724 189.759 113.958 189.759 117.31C189.759 120.662 187.524 122.897 184.172 122.897Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M122.724 122.897H72.4486C69.0966 122.897 66.8622 120.662 66.8622 117.31C66.8622 113.958 69.0966 111.724 72.4486 111.724H122.724C126.076 111.724 128.311 113.958 128.311 117.31C128.311 120.662 126.076 122.897 122.724 122.897Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M228.862 156.414H184.172C180.82 156.414 178.586 154.179 178.586 150.827C178.586 147.475 180.82 145.241 184.172 145.241H228.862C232.214 145.241 234.449 147.475 234.449 150.827C234.449 154.179 232.214 156.414 228.862 156.414Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M150.655 156.414H111.552C108.2 156.414 105.966 154.179 105.966 150.827C105.966 147.475 108.2 145.241 111.552 145.241H150.655C154.007 145.241 156.242 147.475 156.242 150.827C156.242 154.179 154.007 156.414 150.655 156.414Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M89.2068 156.414H72.448C69.096 156.414 66.8615 154.179 66.8615 150.827C66.8615 147.475 69.096 145.241 72.448 145.241H89.2068C92.5588 145.241 94.7932 147.475 94.7932 150.827C94.7932 154.179 92.5588 156.414 89.2068 156.414Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M228.862 189.931H212.103C208.751 189.931 206.517 187.697 206.517 184.345C206.517 180.993 208.751 178.758 212.103 178.758H228.862C232.214 178.758 234.449 180.993 234.449 184.345C234.449 187.697 232.214 189.931 228.862 189.931Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M189.759 189.931H133.897C130.545 189.931 128.31 187.697 128.31 184.345C128.31 180.993 130.545 178.758 133.897 178.758H189.759C193.111 178.758 195.345 180.993 195.345 184.345C195.345 187.697 193.11 189.931 189.759 189.931Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M100.38 189.931H72.4486C69.0966 189.931 66.8622 187.697 66.8622 184.345C66.8622 180.993 69.0966 178.758 72.4486 178.758H100.38C103.732 178.758 105.966 180.993 105.966 184.345C105.966 187.697 103.731 189.931 100.38 189.931Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M228.862 223.448H167.414C164.062 223.448 161.828 221.214 161.828 217.862C161.828 214.51 164.062 212.275 167.414 212.275H228.862C232.214 212.275 234.449 214.51 234.449 217.862C234.449 221.214 232.214 223.448 228.862 223.448Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M133.897 223.448H111.552C108.2 223.448 105.966 221.214 105.966 217.862C105.966 214.51 108.2 212.275 111.552 212.275H133.897C137.249 212.275 139.483 214.51 139.483 217.862C139.483 221.214 137.249 223.448 133.897 223.448Z" fill="#ECBEFF" fill-opacity="0.56"/>
    <path d="M89.2068 223.448H72.448C69.096 223.448 66.8615 221.214 66.8615 217.862C66.8615 214.51 69.096 212.275 72.448 212.275H89.2068C92.5588 212.275 94.7932 214.51 94.7932 217.862C94.7932 221.214 92.5588 223.448 89.2068 223.448Z" fill="#ECBEFF" fill-opacity="0.56"/>
    </svg>
            There are currently no notes... <br>
            Let's create one!
        </p>
        ` 
        return} 
        EmptyNotesContainer.innerHTML = ''
        AllnotesContainer.innerHTML = notes.map(note => `
        <div class="notes-container">
            <h1 class="notes-heading">
            ${note.title}
            </h1>
            <article class="notes-content">
            ${note.content}
            </article>
            <button class="edit-btn container-btns" onclick="openDialog('${note.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/></svg>
            </button>
            <button class="delete-btn container-btns" onclick="deletenote('${note.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
        </div>`).join('');

}

document.addEventListener('DOMContentLoaded', () => {
    notes = getNotes();
    renderNotes()
    const noteForm = document.getElementById('note-form');
    noteForm.addEventListener('submit', (e) => {Noteform(e)})
  noteDialog.addEventListener('click', function(e) {
    if(e.target === this) {
        closeDialog();
    }
});
    // themes
    const themes = document.querySelectorAll('.themes');
    const lights = document.querySelectorAll('.light');
    const darks = document.querySelectorAll('.dark');
    
    
    themes.forEach((theme) => {
    theme.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('light-theme');
        lights.forEach(light => {light.classList.toggle('inactive');});
        darks.forEach(dark => {dark.classList.toggle('active');})
        localStorage.setItem('themes', isDark ? 'light' : 'dark');
    })
})
    const savedTheme = localStorage.getItem('themes');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        lights.forEach(light => {light.classList.add('inactive');});
        darks.forEach(dark => {dark.classList.add('active');});
    } else {
        document.body.classList.remove('light-theme');
        lights.forEach(light => {light.classList.remove('inactive');});
        darks.forEach(dark => {dark.classList.remove('active');});
    }


    // menubtn
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('nav-close');
    const Menu = document.getElementById('navbar-mobile');

    openMenu.addEventListener('click', () => {
    Menu.classList.add('active');
    });
    closeMenu.addEventListener('click', () => {
    Menu.classList.remove('active');
    });

    // login
    const openBtns = document.querySelectorAll('.openbtn');
    const loginpage = document.getElementById('login-page-container');
    const closebtn = document.getElementById('closebtn');
    const loginForm = document.getElementById('login-form');
    const name = document.getElementById('username');
    const password = document.getElementById('password');

    openBtns.forEach(openbtn => {
        openbtn.addEventListener('click', () => {
         loginpage.classList.add('active');
    
        });
    });
        closebtn.addEventListener('click', () => {
            loginpage.classList.remove('active');
        })
    loginForm.addEventListener('submit', (e) => {
        const nameValue = name.value.trim();
        const passValue = password.value.trim();
        const errMessage = document.getElementById('message');
        if (nameValue === '' && passValue === '') {
            e.preventDefault()
            errMessage.textContent = `Please fill your information before proceeding`;
        setTimeout(() => {
            errMessage.textContent = '';
        }, 4000);
            return
        } else if (nameValue === '') {
            e.preventDefault()
            errMessage.textContent = `Please enter your Username`;
        setTimeout(() => {
            errMessage.textContent = '';
        }, 4000);
        return
        } else if (passValue === '') {
            e.preventDefault()
            errMessage.textContent = `Please enter your Password`;
        setTimeout(() => {
            errMessage.textContent = '';
        }, 4000);
        return
        }
    })
});