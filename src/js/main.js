const inputElement = document.querySelector('#title')
const createBtn = document.querySelector('#create')
const listElement = document.querySelector('#list')
let tasks = []
const saveTasks = JSON.parse(localStorage.getItem('tasks'))
console.log(saveTasks)
let notes = [
  {
    title: 'cho',
    completed: false,
  },
  {
    title: 'en',
    completed: false,
  },
]

createBtn.onclick = function() {
  if (inputElement.value.length === 0) {return}
  const newNote = {
    title: inputElement.value,
    completed: false,
  }
  tasks.push(newNote)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  inputElement.value = ''
  render()
}

listElement.onclick = function(event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index)
    const type = event.target.dataset.type
    if (type === 'toggle') {
      notes[index].completed = !notes[index].completed
    } else if (type === 'remove') {
      notes.splice(index, 1)
    } 
  }

  render()
}

function getNoteTemplate(note, index) {
  return `
    <li class=" ${
			'content-list-group'
			// note.completed ? 'content-list-group__true' : 'content-list-group'
		}">
      <h2 class="content-list-group__text ${
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
	if (notes.length === 0) {
		listElement.innerHTML = '<p>Нет элементов</p>'
	}
	for (let i = 0; i < notes.length; i++) {
		listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
	}
  for (let i = 0; i < saveTasks.length; i++) {
		listElement.insertAdjacentHTML('beforeend', getNoteTemplate(saveTasks[i], i))
	}
}
render()
