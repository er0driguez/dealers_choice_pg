const express = require('express');
const app = express();
const port = 8080;
const pg = require('pg');
const client = new pg.Client('postgres://localhost/library');


app.get('/', async (req, res, next) => {
    try{
    const data = await client.query(`SELECT * FROM books`);
    const books = data.rows;

    const html = `
    <html>
        <head>
            <title>Friendly Neighborhood Library</title>
        </head>
        <body>
            <h1>Your Neighborhood Library</h1>
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
        const response = await client.query(`SELECT * FROM books WHERE id=$1`, [req.params.id]);
        const book = response.rows[0];

        const html = `
            <html>
                <head>
                    <title>${book.title}</title>
                </head>
                <body>
                    <h1>${book.title}</h1>
                    <div class="author-info">By: ${book.author}</div>
                    Checked Out By: ${book.borrower}
                    <div class="book-info">
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
        await client.connect();
    }
    catch(err) {
        console.log(err);
    }
};

setup();

 app.listen(port, () => {
     console.log(`listening on port ${port}`);
 });



