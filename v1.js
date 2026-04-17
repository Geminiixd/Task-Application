const FormElement = document.getElementById('taskform')
const FormInput = document.getElementById('taskinput')
const FormSubmit = document.getElementById('tasksubmit')
const TasksList = document.getElementById('taskslist')
const closebtn = document.getElementById('closeModal')
const openmodal = document.getElementById('openmodal')

// closebtn.parentElement.classList.add('hidden')


const getTasks = () => {
    const tasks = []
    const items = document.querySelectorAll('li')

    items.forEach(li => {
        const text = li.childNodes[0].nodeValue.trim()
        const done = li.querySelector('.btn-done').parentElement.parentElement.classList.contains('li-done')

        tasks.push({
            task: text,
            done: done
        })
    })

    return tasks


}

const saveTasks = (func) => {
    const data = JSON.stringify(func, 2, null)
    localStorage.setItem('tasks', data)
    return data
}
// console.log(saveTasks(getTasks()))

const delInput = (input) => {
    input.value = ''
}

const importTasks = () => {
    const data = localStorage.getItem('tasks')
    const parsed = JSON.parse(data)

    parsed.forEach(e => {
        let btnParent = document.createElement('div')
        btnParent.classList.add('btn-parent-div')
        let task = document.createElement('li')
        task.classList.add('task')

        if (e.done === true) {
            task.classList.add('li-done')
        }

        let buttonHTML = document.createElement('button')
        buttonHTML.id = 'btnDel'
        buttonHTML.classList.add('btn-del')
        const btnSelect = document.getElementById('btnDel')
        buttonHTML.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12m-1 0l-.4 11.2a2 2 0 01-2 1.8H8.4a2 2 0 01-2-1.8L6 7m3-3h6a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
</svg>`
        task.innerHTML = e.task
        let btn = btnSelect
        TasksList.appendChild(task)

        let doneBtn = document.createElement('button')
        doneBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
</svg>`
        doneBtn.classList.add('btn-done')

        doneBtn.addEventListener('click', (e) => {
            const btn = e.target
            const li = btn.parentElement.parentElement.parentElement
            li.classList.add('li-done')
            btn.classList.add('task-done')
            saveTasks(getTasks())
        })

        btnParent.appendChild(doneBtn)
        btnParent.appendChild(buttonHTML)

        task.appendChild(btnParent)
        // task.appendChild(doneBtn)

        // task.appendChild(buttonHTML)

        TasksList.appendChild(task)


        buttonHTML.addEventListener('click', (e) => {
            const task = e.target.parentElement.parentElement
            task.remove()
            saveTasks(getTasks())

        })

    })
}

document.body.onload = importTasks()


FormSubmit.addEventListener('click', (e) => {

    if (FormInput.value === '') {
        alert('Fill in smth')
        return
    }



    e.preventDefault()
    let btnParent = document.createElement('div')
    btnParent.classList.add('btn-parent-div')
    let task = document.createElement('li')
    task.classList.add('task')
    let buttonHTML = document.createElement('button')
    buttonHTML.id = 'btnDel'
    buttonHTML.classList.add('btn-del')
    const btnSelect = document.getElementById('btnDel')
    buttonHTML.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12m-1 0l-.4 11.2a2 2 0 01-2 1.8H8.4a2 2 0 01-2-1.8L6 7m3-3h6a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
</svg>`
    task.innerHTML = FormInput.value
    let btn = btnSelect
    TasksList.appendChild(task)

    let doneBtn = document.createElement('button')
    doneBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
</svg>`
    doneBtn.classList.add('btn-done')

    doneBtn.addEventListener('click', (e) => {
        const btn = e.target
        const li = btn.parentElement.parentElement
        btn.classList.add('task-done')
        li.classList.add('li-done')

        saveTasks(getTasks())
    })

    btnParent.appendChild(doneBtn)
    btnParent.appendChild(buttonHTML)

    task.appendChild(btnParent)
    // task.appendChild(doneBtn)

    // task.appendChild(buttonHTML)

    FormInput.value = ''


    buttonHTML.addEventListener('click', (e) => {
        const task = e.target.parentElement.parentElement
        task.remove()

        saveTasks(getTasks())
    })
    setTimeout((e) => {
        saveTasks(getTasks())
        Toastify({
            text: "Saved!",
            duration: 3000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }, 1000);


})

const clearbtn = document.getElementById('clearTasks')

clearbtn.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.setItem('tasks', '[]')
    TasksList.innerHTML = ''
    Toastify({
        text: "Cleared",
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "red",
        },
        onClick: function () { } // Callback after click
    }).showToast();
})




// closebtn.addEventListener('click', (e) => {
//     e.preventDefault()
//     closebtn.parentElement.classList.add('hidden')
// })

// openmodal.addEventListener('click', (e) => {
//     e.preventDefault()
//     closebtn.parentElement.classList.remove('hidden')
// })