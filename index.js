require('dotenv').config({path: __dirname + "/.env"});
const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const getDb = async () => {
    const databaseId = process.env.DATABASE_ID;
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            or: [
                {
                    property: 'Status',
                    status: {
                        equals: 'To Do',
                    },
                },
                 {
                    property: 'Status',
                    status: {
                        equals: 'In Progress',
                    },
                },
            ],
        },
    });
    response.results.forEach((page) => {
        const currentDate = new Date().toISOString().split('T')[0];
        const taskDate = page.properties['Date'].date?.start;
        if (taskDate < currentDate) {
            updateTaskDate(page.id);
        }
    });
};
(async () => {
    getDb();
})();

async function updateTaskDate(pageId) {
    const response = await notion.pages.update({
        page_id: pageId,
        properties: {
            Date: {
                date: {
                    // date with no time
                    start: new Date().toJSON().split("T")[0]
                },
            },
        },
    });
    const taskName = response?.properties?.Name.title[0].text.content;
    if (taskName) {
        console.log(`updated task date for task: ${taskName}`)
    }
}
