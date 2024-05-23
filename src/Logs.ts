import * as File from "@wiggly-games/files"

// Path to a directory to store log files.
let logsDirectory: string;

// Different types for outputting, used internally.
enum OutputType {
    Info,
    Warning,
    Error
};

// Converts from the passed in data into an output string format.
// Output format includes current date, current time, and the message.
function createOutputMessage(type: OutputType, ...data) : string {
    // Output will be of the format:
    // DATE : TIME : Message
    var date = new Date();
    var yearMonthDay = date.toISOString().split('T')[0];
    var time = [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
    var message = [...data].join(" ");
    return `${yearMonthDay} - ${time} - ${OutputType[type]} - ${message}`;
}

// Main method for writing to a log file. Takes the local file path (from root of the project) and data to output.
async function writeLogs(logFile : string, outputType: OutputType, ...data){
    if (logsDirectory === undefined) {
        console.warn(`Logs directory not set up, will only log to console.`);
    }
    var text = createOutputMessage(outputType, ...data);

    if (logsDirectory) {
        await File.Append(`${logsDirectory}\\${logFile}.log`, text);
    } else {
        switch (outputType) {
            case OutputType.Info:
                console.log(text);
                break;
            case OutputType.Warning:
                console.warn(text);
                break;
            case OutputType.Error:
                console.error(text);
                break;
        }
    }
}

// Logs an error
export async function WriteError(name: string, ...data) {
    return await writeLogs(name, OutputType.Error, ...data);
}

// Logs an info message
export async function WriteLog(name: string, ...data) {
    return await writeLogs(name, OutputType.Info, ...data);
}

// Logs a warning
export async function WriteWarning(name: string, ...data) {
    return await writeLogs(name, OutputType.Warning, ...data);
}

// Sets a root path for writing log files.
export function SetOutputPath(path: string) {
    logsDirectory = path;
}