module.exports = () => `
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS borrowers;

    CREATE TABLE borrowers(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );
    
    CREATE TABLE books(
        id SERIAL PRIMARY KEY,
        borrower INTEGER REFERENCES borrowers(id) DEFAULT NULL,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL,
        about TEXT DEFAULT NULL,
        checkedout TEXT NOT NULL,
        duedate DATE DEFAULT NULL
    );
    
    INSERT INTO borrowers (name) VALUES ('Alice Yang');
    INSERT INTO borrowers (name) VALUES ('Maddy Ramos');
    INSERT INTO borrowers (name) VALUES ('Alisha Johnson');

    INSERT INTO books (borrower, title, author, genre, about, checkedout, duedate) VALUES ((SELECT id from borrowers where name='Alice Yang'), 'The Fifth Season', 'N.K. Jemisen', 'Fantasy', 'The world is going to end.', 'Checked Out', now());
    INSERT INTO books (borrower, title, author, genre, about, checkedout, duedate) VALUES ((SELECT id from borrowers where name='Maddy Ramos'), 'Eloquent Javascript', 'Marjin Haverbeke', 'Computers', 'Much JS, such wow', 'Checked Out', now());
    INSERT INTO books (borrower, title, author, genre, about, checkedout, duedate) VALUES (null, 'Play It As It Lays', 'Joan Didion', 'Fiction', 'Hippies In California', 'Not Checked Out', now());
    
`