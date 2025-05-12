const fs = require('fs')
const filePath = './tasks.json'

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath)
        //output is hexadecimal
        const dataJSON = dataBuffer.toString()
        //convert hexadecimal to string 
        const toJSON = JSON.parse(dataJSON);
        //covert string to object
        return toJSON;

    } catch (error) {
        return []
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks)
    //converts to string to save back into tasks.json
    fs.writeFileSync(filePath, dataJSON)
}

//CREATE
const addTask = (taskName) => {
    const tasks = loadTasks();
    tasks.push({ taskName });
    saveTasks(tasks);
}

//READ
const listTask = () => {
    const tasks = loadTasks()
    tasks.forEach((task, index) => {
        //ERROR
        // console.log(`${index + 1} - ${task}`)    //Error
        console.log(`${index + 1} - ${task.taskName}`)
    });
}

//REMOVE
const removeTask = (taskName) => {
    const tasks = loadTasks();
    //ERROR
    /*
     tasks.filter((task) => {
        return task.taskName !== taskName;
     })
     saveTasks(tasks) 
    */
    const filtered = tasks.filter((task) => {
        return task.taskName !== taskName;
    })
    saveTasks(filtered);
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
const change = process.argv[4]   //used for update 

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