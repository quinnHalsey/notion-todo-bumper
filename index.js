require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const app = document.getElementById('app');
console.log(app);
app.innerHTML = 'hello';


(async () => {
    const users = await notion.users.list({});
})();

const getDb = async () => {
  const databaseId = process.env.DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'Status',
          select: {
            equals: 'To Do'
          }
        }
      ]
    },
    // filter: {
    //   or: [
    //     {
    //       property: 'In stock',
    //       checkbox: {
    //         equals: true,
    //       },
    //     },
    //     {
    //       property: 'Cost of next trip',
    //       number: {
    //         greater_than_or_equal_to: 2,
    //       },
    //     },
    //   ],
    // },
    // sorts: [
    //   {
    //     property: 'Last ordered',
    //     direction: 'ascending',
    //   },
    // ],
  });
  response.results.forEach((page) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const taskDate = page.properties['Date'].date?.start;
    console.log(taskDate, 'task date', currentDate, 'current date');
    if (page.properties['Date'].date?.start < currentDate) {
      console.log('page date is less than todays date');
      updateTaskDate(page.id);
    }
    console.log(page.properties);
  })
}
(async () => {
  getDb();
})();

async function updateTaskDate(pageId) {
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      'Date': new Date()
    },
  });
  console.log(response);
}

