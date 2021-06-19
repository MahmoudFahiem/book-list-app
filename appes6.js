// UI Variables
const UIbookForm = document.querySelector('#book-form');
const UIbookTitle = document.querySelector('#title');
const UIbookAuthor = document.querySelector('#author');
const UIbookIsbn = document.querySelector('#isbn');
const UIbookList = document.querySelector('#book-list');

// Book varructor

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI varructor

class UI {
    constructor() {}

    addBookToList(book) {
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

    removeBookItem(book) {
        book.remove();
    }

    clearFields() {
        UIbookTitle.value = '';
        UIbookAuthor.value = '';
        UIbookIsbn.value = '';
    }

    showAlert(message, className, type) {
        const alert = document.querySelector(`.alert.${className}.${type}`);
        console.log(alert);
        if (!alert) {
            const alertTemp = `
                <p class="alert ${className} ${type}">${message}</p> 
            `;
            UIbookForm.insertAdjacentHTML('afterbegin', alertTemp);
            this.hideAlert();
        }
    }

    hideAlert() {
        const alert = document.querySelector('.alert');
        setTimeout(function () {
            alert.remove();
        }, '3000');
    }
};

const ui = new UI();

// Event Listners

UIbookForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const   bookTitle = UIbookTitle.value,
            bookAuthor = UIbookAuthor.value,
            bookIsbn = UIbookIsbn.value;

    if (bookTitle == '' || bookAuthor == '' || bookIsbn == '') {
        ui.showAlert('Please fill in all fields', 'error', 'fill-fields');
    } else {
        const book = new Book(bookTitle, bookAuthor, bookIsbn);
        ui.addBookToList(book);
        ui.showAlert('Book Item added', 'success', 'book-added');
        ui.clearFields();
    }
})

UIbookList.addEventListener('click', function (e) {
    e.preventDefault();
    const clickedEl = e.target;
    if (clickedEl.id == 'delete') {
        const bookItem = clickedEl.parentElement.parentElement;
        ui.removeBookItem(bookItem);
        ui.showAlert('Book Item Removed', 'success', 'book-removed');
    }
})