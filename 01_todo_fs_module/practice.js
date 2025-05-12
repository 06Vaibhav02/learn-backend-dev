const fs = require('fs')   //an object //file system module
const filePath = './tasks.json'


//load tasks from json file
const loadTasks = () => {
  //we use try catch - just like in API we can get error while getting data
  //in filesystem we can get error while getting data
  try {
    const dataBuffer = fs.readFileSync(filePath, 'utf8')  //output is a buffer - hexadecimal format
    // console.log(dataBuffer)
    // console.log(typeof dataBuffer)
    const toJSON = JSON.parse(dataBuffer); //convert to object
    console.log(toJSON)
    // console.log(typeof toJSON) 
    return toJSON;

  } catch (error) {
    return []
  }
}

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks) //converts to string to save back into tasks.json
  fs.writeFileSync(filePath, dataJSON)
}


//CREATE
const addTask = (taskName) => {
  const tasks = loadTasks(); //loads the file in to tasks in object format
  console.log(tasks);
  tasks.push({ taskName });
  saveTasks(tasks);
  console.log('task added', taskName)
}

//READ
const listTask = () => {
  const tasks = loadTasks()
  tasks.forEach((task, index) => {
    // console.log(`${index + 1} - ${task}`)    //Error
    console.log(`${index + 1} - ${task.taskName}`)
  });
}

//REMOVE
const removeTask = (taskName) => {
  const tasks = loadTasks();
  // tasks.filter((task) => {
  //     return task.taskName !== taskName;
  // }) //error
  const filtered = tasks.filter((task) => {
    return task.taskName !== taskName;
  })
  console.log("remove", filtered)
  saveTasks(filtered) //tasks
  saveTasks(filtered)
}

//UPDATE
const updateTask = (taskName, newTaskName) => {
  const tasks = loadTasks();
  for (const object of tasks) {
    if (object.taskName === taskName) {
      object.taskName = newTaskName
    }
  }
  saveTasks(tasks);
}


const command = process.argv[2]
const argument = process.argv[3]
const change = process.argv[4]   //for update

if (command === 'add') {
  addTask(argument);
} else if (command === 'list') {
  listTask();
} else if (command === 'remove') {
  removeTask(argument)
} else if (command === 'update') {
  updateTask(argument, change);
}
else {
  console.log('Enter some command')
}