// UI Variables
const UIbookForm = document.querySelector('#book-form');
const UIbookTitle = document.querySelector('#title');
const UIbookAuthor = document.querySelector('#author');
const UIbookIsbn = document.querySelector('#isbn');
const UIbookList = document.querySelector('#book-list');

// Book Constructor

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Constructor

class UI {
    static addBookToList(book) {
        const rowTemp = `
            <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" id="delete">X</a></td>
            </tr>
        `;

        UIbookList.insertAdjacentHTML('beforeend', rowTemp);
    }

    static removeBookItem(book) {
        book.remove();
    }

    static clearFields() {
        UIbookTitle.value = '';
        UIbookAuthor.value = '';
        UIbookIsbn.value = '';
    }

    static showAlert(message, className, type) {
        const alert = document.querySelector(`.alert.${className}.${type}`);
        if (alert) return
        const alertTemp = `
            <p class="alert ${className} ${type}">${message}</p> 
        `;
        UIbookForm.insertAdjacentHTML('afterbegin', alertTemp);
        this.hideAlert();
        
    }

    static hideAlert() {
        const alert = document.querySelector('.alert');
        setTimeout(function () {
            alert.remove();
        }, '3000');
    }
};

// Local Storage Constructor

class Store {
    static getBooks() {

        const books = localStorage.getItem('books');

        if (!books) return [];
        
        return booJSON.parse(books);
    }

    static displayBooks(books) {
        books.forEach(function (book) {
            UI.addBookToList(book);
        });
    }

    static updateLocalStorage(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    static initScene(){
        displayBooks(Store.getBooks());
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        Store.updateLocalStorage(books);
    }

    static removeBook(bookIsbn) {
        const books = Store.getBooks();

        // books.forEach(function(book, index) {
        //     if(book.isbn === isbn) {
        //         books.splice(index, 1);
        //     }
        // })

        const newBooks = books.filter(book => book.isbn !== bookIsbn)

        Store.updateLocalStorage(newBooks);
    }
}


// Event Listners

document.addEventListener('DOMContentLoaded', function() {
    Store.displayBooks();
})

UIbookForm.addEventListener('submit',  e => {
    e.preventDefault();
    const   bookTitle = UIbookTitle.value,
            bookAuthor = UIbookAuthor.value,
            bookIsbn = UIbookIsbn.value;

    if (!bookTitle || !bookAuthor || !bookIsbn) return UI.showAlert('Please fill in all fields', 'error', 'fill-fields');

    const book = new Book(bookTitle, bookAuthor, bookIsbn);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.showAlert('Book Item added', 'success', 'book-added');
    UI.clearFields();
})

UIbookList.addEventListener('click', function (e) {
    e.preventDefault();
    const clickedEl = e.target;
    if (clickedEl.id !== 'delete') return;

    const bookIsbn = clickedEl.parentElement.previousElementSibling.textContent;
    const bookItem = clickedEl.parentElement.parentElement;
    UI.removeBookItem(bookItem);
    Store.removeBook(bookIsbn);
    UI.showAlert('Book Item Removed', 'success', 'book-removed');
})