# Notion To-Do Bumper
A simple script to help manage To Dos and due dates: if due date has passed, bump an unfinished task to current date

## Installation
1. Clone the repository:
```bash
# TODO: REPLACE URL
 git clone https://github.com/yourusername/yourproject.git
```

2. Install dependencies:
```bash
 npm install
 ```

## Usage
1. In the root directory a .env file with your Notion API key and to-do database ID in the following format:
```.env
NOTION_TOKEN="<API_TOKEN>"
DATABASE_ID="<DATABASE_ID>"
 ```

2. To run the script once, run
```bash
node index.js
```
from the root directory.

3. To periodically update your database, set up a cron job to run the script at your desired interval or time (e.g. every 24 hours) or use a tool like [Github Actions](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/adding-scripts-to-your-workflow)

