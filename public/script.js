const FormElement = document.getElementById('taskform')
const FormInput = document.getElementById('taskinput')
const FormSubmit = document.getElementById('tasksubmit')
const TasksList = document.getElementById('taskslist')
const clearbtn = document.getElementById('clearTasks')
const closebtn = document.getElementById('closeModal')
const openmodal = document.getElementById('openModal')
const bookmarkBtn = document.getElementById('bookmarkBtn')
const bookmarkName = document.getElementById('bookmarkName')
const bookmarkLink = document.getElementById('bookmarkLink')
const bookmarkList = document.getElementById('bookmarkList')
const datepicker = document.getElementById('datepicker');

/* =========================
   GET TASKS
========================= */
const getTasks = () => {
    const tasks = []
    const items = document.querySelectorAll('#taskslist li')

    items.forEach(li => {
        const text = li.querySelector('.task-text').textContent.trim()
        const done = li.classList.contains('li-done')
        const date = li.querySelector('.task-date')?.textContent || null

        tasks.push({
            task: text,
            done: done,
            date: date,
            createdAt: new Date().toISOString()
        })
    })

    return tasks
}

/* =========================
   SAVE TASKS
========================= */
const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Date formatting 

const formatRelativeDate = (dateString) => {
    if (!dateString) return ''

    const now = new Date()
    const target = new Date(dateString)

    // Remove time to avoid timezone issues
    now.setHours(0, 0, 0, 0)
    target.setHours(0, 0, 0, 0)

    const diffMs = target - now
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays === -1) return 'Yesterday'

    if (Math.abs(diffDays) < 31)
        return diffDays > 0 ? `In ${diffDays} days` : `${Math.abs(diffDays)} days ago`

    const diffMonths = Math.round(diffDays / 30)

    if (Math.abs(diffMonths) < 12)
        return diffMonths > 0 ? `In ${diffMonths} months` : `${Math.abs(diffMonths)} months ago`

    const diffYears = Math.round(diffMonths / 12)
    return diffYears > 0 ? `In ${diffYears} years` : `${Math.abs(diffYears)} years ago`
}


/* =========================
   CREATE TASK ELEMENT
========================= */
const createTaskElement = (text, date = null, isDone = false) => {
    const task = document.createElement('li')
    task.classList.add('task')
    if (isDone) task.classList.add('li-done')

    const span = document.createElement('span')
    span.classList.add('task-text')
    span.textContent = text

    const btnParent = document.createElement('div')
    btnParent.classList.add('btn-parent-div')

    const datelabel = document.createElement('span');

    datelabel.classList.add('task-date')

    datelabel.textContent = date ? formatRelativeDate(date) : ''

    /* DONE BUTTON */
    const doneBtn = document.createElement('button')
    doneBtn.classList.add('btn-done')
    doneBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>`

    doneBtn.addEventListener('click', (e) => {
        const li = e.currentTarget.closest('li')
        li.classList.toggle('li-done')
        saveTasks(getTasks())
    })

    /* DELETE BUTTON */
    const delBtn = document.createElement('button')
    delBtn.classList.add('btn-del')
    delBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12m-1 0l-.4 11.2a2 2 0 01-2 1.8H8.4a2 2 0 01-2-1.8L6 7m3-3h6a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
    </svg>`

    delBtn.addEventListener('click', (e) => {
        const li = e.currentTarget.closest('li')
        li.remove()
        saveTasks(getTasks())
    })
    task.appendChild(span)
    btnParent.appendChild(doneBtn)
    btnParent.appendChild(delBtn)
    task.appendChild(btnParent)
    task.appendChild(datelabel);

    return task
}

/* =========================
   IMPORT TASKS
========================= */
const importTasks = () => {
    const data = localStorage.getItem('tasks')
    if (!data) return

    const parsed = JSON.parse(data)

    parsed.forEach(taskObj => {
        const taskElement = createTaskElement(taskObj.task, taskObj.date, taskObj.done)
        TasksList.appendChild(taskElement)
    })
}


/* =========================
   ADD TASK
========================= */
FormSubmit.addEventListener('click', (e) => {
    e.preventDefault()

    if (FormInput.value.trim() === '') {
        alert('Fill in something')
        return
    }

    const taskElement = createTaskElement(FormInput.value, datepicker.value)
    TasksList.appendChild(taskElement)

    FormInput.value = ''

    saveTasks(getTasks())

    Toastify({
        text: "Saved!",
        duration: 3000,
        gravity: "top",
        position: "left",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
})

/* =========================
   CLEAR ALL
========================= */
clearbtn.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.setItem('tasks', '[]')
    TasksList.innerHTML = ''

    Toastify({
        text: "Cleared",
        duration: 3000,
        gravity: "top",
        position: "left",
        style: {
            background: "red",
        }
    }).showToast()
})

// Open & close modal 

// Default class 

let modal = document.getElementById('modal')
modal.classList.add('hidden')

closebtn.addEventListener('click', (e) => {
    e.preventDefault()
    closebtn.parentElement.classList.add('hidden')
    closebtn.parentElement.classList.remove('visible')
})

openmodal.addEventListener('click', (e) => {
    e.preventDefault()
    closebtn.parentElement.classList.remove('hidden')
    closebtn.parentElement.classList.add('visible')
})

// Bookmarks 

let createBookmark = (inputName, inputLink, parentList) => {



    let booksmarks = parentList

    let newBookmark = document.createElement('li')
    let newBookmarkContent = document.createElement('a')
    newBookmarkContent.textContent = inputName
    newBookmarkContent.href = inputLink
    newBookmark.classList.add('bookmark')
    newBookmark.classList.add('text-white')


    newBookmark.appendChild(newBookmarkContent)

    booksmarks.appendChild(newBookmark)


    bookmarkName.value = ''
    bookmarkLink.value = ''
    return newBookmark
}

bookmarkBtn.addEventListener('click', () => {
    createBookmark(bookmarkName.value, bookmarkLink.value, bookmarkList)
    savebookMarks(getbookMarks())
})

let getbookMarks = () => {
    let data = []
    let bookmarksList = document.querySelectorAll('#bookmarkList li')
    console.log(bookmarkList)
    bookmarksList.forEach(item => {
        let text = item.querySelector('a').textContent.trim()
        let link = item.querySelector('a').href

        data.push({
            text: text,
            link: link
        })
    })

    return data
}

let importbookMarks = () => {
    const data = localStorage.getItem('bookmarks')
    if (!data) return;


    const parsed = JSON.parse(data)

    parsed.forEach(item => {
        createBookmark(item.text, item.link, bookmarkList)
    })
}

let savebookMarks = (bookmarks) => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}


// Settings

const settingsPanel = document.getElementById('settings')
const settingsBtn = document.getElementById('closeSettings')
const settingsOpen = document.getElementById('openSettings')

settingsPanel.classList.add('hidden')

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.remove('visible')
    settingsPanel.classList.add('hidden')
})

settingsOpen.addEventListener('click', () => {
    settingsPanel.classList.remove('hidden')
    settingsPanel.classList.add('visible')
})



const themeSettingsBtn = document.getElementById('themeSettings');
const accountSettingsBtn = document.getElementById('accountSettings')

let settingsOpener = (element) => {

    const panel = element.nextElementSibling;
    const isClosed = panel.classList.contains('max-h-0');

    panel.classList.toggle('hidden')
}

themeSettingsBtn.addEventListener('click', (e) => {
    settingsOpener(themeSettingsBtn)
})

accountSettingsBtn.addEventListener('click', (e) => {
    settingsOpener(accountSettingsBtn)
})


const SettingsFname = document.getElementById('fname')
const SettingsLname = document.getElementById('lname')
const SettingsID = document.getElementById('settingsID')
const SettingsZipcode = document.getElementById('zipcode')
const SettingsAddress = document.getElementById('address')
const SettingsInfoSubmit = document.getElementById('infosubmit')
const SettingsInfoArray = document.getElementById('infoarray')

const saveInfo = () => {
    const inputs = SettingsInfoArray.querySelectorAll('input')
    const info = {}

    inputs.forEach(item => {

        info[item.id] = item.value
    })

    const data = JSON.stringify(info)

    localStorage.setItem('info', data)

    return info
}

const getinfo = () => {
    const parsed = JSON.parse(localStorage.getItem('info'))

    if (parsed) {
        SettingsFname.value = parsed.fname
        SettingsLname.value = parsed.lname
        SettingsAddress.value = parsed.address
        SettingsZipcode.value = parsed.zipcode
        SettingsID.value = parsed.settingsID
    }
}



SettingsInfoSubmit.addEventListener('click', (e) => {
    saveInfo()
})

/* =========================
   LOAD ON START
========================= */
document.addEventListener('DOMContentLoaded', importTasks)
document.addEventListener('DOMContentLoaded', importbookMarks)
document.addEventListener('DOMContentLoaded', getinfo)


