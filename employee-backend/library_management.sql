USE LIBRARYDB;
Database changed
MariaDB [LIBRARYDB]> CREATE TABLE Authors (
    ->     author_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(255) NOT NULL
    -> );
Query OK, 0 rows affected (0.249 sec)

MariaDB [LIBRARYDB]> CREATE TABLE Books (
    ->     book_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     title VARCHAR(255) NOT NULL,
    ->     author_id INT,
    ->     available_copies INT DEFAULT 1,
    ->     FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE SET NULL
    -> );
Query OK, 0 rows affected (0.034 sec)

MariaDB [LIBRARYDB]> CREATE TABLE Members (
    ->     member_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(255) NOT NULL,
    ->     email VARCHAR(255) UNIQUE NOT NULL
    -> );
Query OK, 0 rows affected (0.033 sec)

MariaDB [LIBRARYDB]> CREATE TABLE BorrowedBooks (
    ->     borrow_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     book_id INT,
    ->     member_id INT,
    ->     borrow_date DATE DEFAULT CURRENT_DATE,
    ->     return_date DATE NULL,
    ->     FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    ->     FOREIGN KEY (member_id) REFERENCES Members(member_id) ON DELETE CASCADE
    -> );
Query OK, 0 rows affected (0.073 sec)

MariaDB [LIBRARYDB]> INSERT INTO Authors (name) VALUES ('J.K. Rowling');
Query OK, 1 row affected (0.064 sec)

MariaDB [LIBRARYDB]> INSERT INTO Books (title, author_id, available_copies) VALUES ('Harry Potter', 1, 5);
Query OK, 1 row affected (0.020 sec)

MariaDB [LIBRARYDB]> INSERT INTO Members (name, email) VALUES ('John Doe', 'john@example.com');
Query OK, 1 row affected (0.009 sec)

MariaDB [LIBRARYDB]> INSERT INTO BorrowedBooks (book_id, member_id) VALUES (1, 1);
Query OK, 1 row affected (0.011 sec)

MariaDB [LIBRARYDB]> UPDATE Books SET available_copies = available_copies - 1 WHERE book_id = 1;
Query OK, 1 row affected (0.019 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [LIBRARYDB]> UPDATE BorrowedBooks SET return_date = CURRENT_DATE WHERE borrow_id = 1;
Query OK, 1 row affected (0.015 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [LIBRARYDB]> UPDATE Books SET available_copies = available_copies + 1 WHERE book_id = 1;
Query OK, 1 row affected (0.006 sec)
Rows matched: 1  Changed: 1  Warnings: 0

MariaDB [LIBRARYDB]> SELECT * FROM BOOKS
    -> ;
+---------+--------------+-----------+------------------+
| book_id | title        | author_id | available_copies |
+---------+--------------+-----------+------------------+
|       1 | Harry Potter |         1 |                5 |
+---------+--------------+-----------+------------------+
1 row in set (0.005 sec)

MariaDB [LIBRARYDB]> SELECT * FROM BorrowedBooks;
+-----------+---------+-----------+-------------+-------------+
| borrow_id | book_id | member_id | borrow_date | return_date |
+-----------+---------+-----------+-------------+-------------+
|         1 |       1 |         1 | 2025-02-12  | 2025-02-12  |
+-----------+---------+-----------+-------------+-------------+
1 row in set (0.000 sec)

MariaDB [LIBRARYDB]> SELECT * FROM Books WHERE available_copies > 0;
+---------+--------------+-----------+------------------+
| book_id | title        | author_id | available_copies |
+---------+--------------+-----------+------------------+
|       1 | Harry Potter |         1 |                5 |
+---------+--------------+-----------+------------------+
1 row in set (0.005 sec)

MariaDB [LIBRARYDB]> SHOW TABLES;
+---------------------+
| Tables_in_librarydb |
+---------------------+
| authors             |
| books               |
| borrowedbooks       |
| members             |
+---------------------+
4 rows in set (0.001 sec)

