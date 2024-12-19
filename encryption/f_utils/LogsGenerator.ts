import * as fs from 'fs';
import * as path from 'path';

const logsDir = path.resolve('./logs/');
const logFilePath = path.resolve('./logs/main.log');

interface LogEntry {
    ip: string;
    level: string;
    statusCode: number;
    method: string;
    url: string;
    agent: string;
    message: string;
}

interface Logs {
    [timestamp: string]: LogEntry;
}

const logs: Logs = {};

function createDir() {
    try {
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
            console.log(`Logs directory created at: ${logsDir}`);
        }

        if (!fs.existsSync(logFilePath)) {
            fs.writeFileSync(logFilePath, '');
            console.log(`Logs file created at: ${logFilePath}`);
        }

    } catch (error) {
        console.error('Error creating logs directory or file:', error);
    }
}

export async function LogsGenerator(
    ip: string,
    level: string,
    statusCode: number,
    method: string,
    url: string,
    agent: string,
    message: string,
) {
    const timestamp = new Date().toLocaleString();

    logs[timestamp] = {
        "ip": ip,
        "level": level.toUpperCase(),
        "statusCode": statusCode,
        "method": method,
        "url": url,
        "agent": agent,
        "message": message
    };

    try {
        createDir();
        await fs.promises.writeFile(logFilePath, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error('Error writing to log file:', error);
    }
}