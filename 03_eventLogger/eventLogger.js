//this logger logs to a file, unlike console.log which logs to console
const fs = require("fs");
const os = require("os");
const EventEmitter = require("events");

//defining our Logger 
class Logger extends EventEmitter {
  log(message) {
    this.emit("message", { message }); //broadcast the event
  }
}

const logger = new Logger(); //our logger
const logFile = "./eventlog.txt"; //we log here

//event handler
const logToFile = (event) => {
  const logMessage = `${new Date().toISOString()} - ${event.message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

//assigning event handler to event 
logger.on("message", logToFile); //keeps listening always // listens to broadcast from line 9

setInterval(() => {
  const memoryUsage = (os.freemem() / os.totalmem()) * 100;
  logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`); //sent to log fn as message
}, 3000);

logger.log("Application Started"); //sent to log fn as message         
logger.log("Application event occured"); //sent to log fn as message
