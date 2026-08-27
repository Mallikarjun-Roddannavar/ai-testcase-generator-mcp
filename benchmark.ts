import * as fs from 'fs';
import * as path from 'path';

// Override config behavior for test purposes
const WORK_DIR = process.cwd();

function readWithoutCache() {
    let systemPrompt = `You are a Test Engineer. Please create a comprehensive test plan for the provided API endpoint.\n`;
    systemPrompt += fs.readFileSync(
      path.join(WORK_DIR, "src", "prompts", "testcase_prompt.txt"),
      "utf-8"
    );
    return systemPrompt;
}

let cachedContent = '';
function readWithCache() {
    let systemPrompt = `You are a Test Engineer. Please create a comprehensive test plan for the provided API endpoint.\n`;
    if (!cachedContent) {
        cachedContent = fs.readFileSync(
            path.join(WORK_DIR, "src", "prompts", "testcase_prompt.txt"),
            "utf-8"
        );
    }
    systemPrompt += cachedContent;
    return systemPrompt;
}

console.time("Without Cache");
for (let i = 0; i < 10000; i++) {
    readWithoutCache();
}
console.timeEnd("Without Cache");

console.time("With Cache");
for (let i = 0; i < 10000; i++) {
    readWithCache();
}
console.timeEnd("With Cache");
