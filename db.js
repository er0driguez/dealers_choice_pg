/*
`
CREATE TABLE borrowers (
    id SERIAL PRIMARY KEY,
    name TEXT DEFAULT NULL
    );

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    borrower INTEGER REFERENCES borrowers(id),
    title TEXT DEFAULT NULL,
    author TEXT DEFAULT NULL,
    genre TEXT DEFAULT NULL,
    about TEXT DEFAULT NULL,
    checkedout TEXT DEFAULT NULL,
    duedate timestamp DEFAULT now()
    );


INSERT INTO borrowers (name) VALUES ('Alice Yang');
INSERT INTO borrowers (name) VALUES ('Maddy Ramos');
INSERT INTO borrowers (name) VALUES ('Alisha Johnson');

INSERT INTO books (borrower, title, author, genre, about, checkedout) VALUES ((SELECT id from borrowers where name='Alice Yang'), 'The Fifth Season', 'N.K. Jemisen', 'Fantasy', 'The world is going to end.', 'yes');
INSERT INTO books (borrower, title, author, genre, about, checkedout) VALUES ((SELECT id from borrowers where name='Maddy Ramos'), 'Eloquent Javascript', 'Marjin Haverbeke', 'Computers', 'Much JS, such wow', 'yes');
INSERT INTO books (borrower, title, author, genre, about, checkedout) VALUES ((SELECT id from borrowers where name='Alisha Johnson'), 'Play It As It Lays', 'Joan Didion', 'Fiction', 'Hippies In California', 'yes');
`

const library = [
    {title: "The Fifth Season", author: "N.K. Jemisen", genre: "Fantasy", checkedout: "y", borrower: "Alice Yang", due: "February 12, 2022", about: "The world is ending"},
    {title: "Eloquent Javascript", author: "Marjin Haverbeke", genre: "Computer Science", checkedOut: "y", borrower: "Maddy Ramos", due: "March 18, 2022", about: "much JS, such wow"},
    {title: "Play It As It Lays", author: "Joan Didion", genre: "Essays", checkedout: "n", borrower: "", due: "n/a", about: "Hippies in California"},
]
*/