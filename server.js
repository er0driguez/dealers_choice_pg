const express = require('express');
const app = express();
const db = require('./db');
const seed = require('./seed');
const path = require('path');

app.use(express.static(path.join(__dirname, 'style')));

app.get('/', async (req, res, next) => {
    try{
    const data = await db.query(`SELECT * FROM books`);
    const books = data.rows;

    const html = `
    <html>
        <head>
            <title>Friendly Neighborhood Library</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
           <header> <h1>Your Neighborhood Library</h1> </header>
           
           <div class='book-week'>Top 3 Books Of The Week </div>
           ${books.map( book => `<div class='book-item'><a href="/books/${book.id}">${book.title}</a>
            </div>`).join("")}
        </body>
    </html>
    `;
    res.send(html);
    }
    catch(err) {
        next(err)
    }
});

app.get('/books/:id', async (req, res, next) => {
    try {
        const response = await db.query(`SELECT * FROM books WHERE id=$1`, [req.params.id]);
        const book = response.rows[0];

        const html = `
            <html>
                <head>
                    <title>${book.title}</title>
                </head>
                <body>
                    <h1>${book.title}</h1>
                    <div class="author-info">By: ${book.author}</div>
                    <div class="book-info">
                        Status: ${book.checkedout}
                    </div>
                    <div class="borrower-name">
                    Checked Out By: ${book.borrower}
                    </div>
                    <div class="book-about">
                    ${book.about}
                    </div>
                <body>
            </html>
        `;

        res.send(html);
    }
    catch(err){
        next(err)
    }
});

const setup = async() => {
    try {
        await db.connect();
        console.log('connected to db');
        await db.query(seed());

        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    }
    catch(err) {
        console.log(err);
    }
};

setup();

 



