
const fs = require('fs');
const filePath = "./task.json";



//Load Task function ======> to add Task,,, Load Task is reauired
const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath)  //read file (in object-format)
        const dataJSON = dataBuffer.toString();  // Object into string (acting as JSON)
        return JSON.parse(dataJSON);   // string into JSON
    } catch (error) {
        return []
    }
}




//Creating saveTask()===> to save all data [convert arrary[] of all data in to string the write]
const saveTasks = (tasks) => {
    const dataString = JSON.stringify(tasks) // convert the JSON data into string (acting JSON)
    fs.writeFileSync(filePath, dataString);

}





//creating a method for addTask()
const addTask = (task) => {
    const tasks = loadTasks();  // 1st read
    tasks.push({ task });  // then add new one ==> recv from argument
    saveTasks(tasks);  //finally save all tasks

    console.log("Task added", task)
}




//Show the each task: listTasks() =====> just read file and display in list
const listTasks = () => {
    const tasks = loadTasks();
    tasks.forEach((task, index) => {
        console.log(`${index + 1} - ${task.task}`)

    });
}




//Grab the command and argument
const command = process.argv[2]     //argv = argument value
const argument = process.argv[3]



//checking commands
if (command === "add") {
    addTask(argument);
} else if (command === "list") {
    listTasks();
} else if (command === "remove") {
    removeTask(parseInt(argument));
} else {
    console.log("Command not found !");
}


