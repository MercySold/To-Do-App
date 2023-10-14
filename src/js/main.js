const inputElement = document.querySelector('#title')
const createBtn = document.querySelector('#create')
const listElement = document.querySelector('#list')

let tasks = [
	{
		title: 'cho',
		completed: false,
	},
	{
		title: 'en',
		completed: false,
	},
]

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
  console.log(tasks)
}

createBtn.onclick = function() {
  if (inputElement.value.length === 0) {return}
  const newNote = {
    title: inputElement.value,
    completed: false,
  }
  tasks.push(newNote)
  saveToLocalStorage()
  render()
  inputElement.value = ''
}


listElement.onclick = function(event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index)
    const type = event.target.dataset.type
    if (type === 'toggle') {
      tasks[index].completed = !tasks[index].completed
    } else if (type === 'remove') {
      tasks.splice(index, 1)
    } 
  }
  saveToLocalStorage()
  render()
}

function getNoteTemplate(note, index) {
  return `
    <li class=" ${
			'content-list-group'
			// note.completed ? 'content-list-group__true' : 'content-list-group'
		}">
      <h2 class=" content-list-group__text ${
				note.completed ? 'content-list-group__text__through' : ''
			}">${note.title}</h2>
      <div class="content-list-group-icons">
        <div class="content-list-group-icons__completed ${
					note.completed ? 'content-list-group-icons__toggle' : ''
				}" data-index="${index}" data-type="toggle" id="toggle"></div>
        <div class="content-list-group-icons__cancel" data-index="${index}" data-type="remove" id="remove"></div>
      </div>
    </li>
  `
}

function render() {
	listElement.innerHTML = ''
	if (tasks.length === 0) {
		listElement.innerHTML = '<p>Нет элементов</p>'
	}
  for (let i = 0; i < tasks.length; i++) {
		listElement.insertAdjacentHTML('beforeend', getNoteTemplate(tasks[i], i))
	}
}
render()

function saveToLocalStorage () {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}