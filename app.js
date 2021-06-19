// UI Variables
var UIbookForm = document.querySelector('#book-form');
var UIbookTitle = document.querySelector('#title');
var UIbookAuthor = document.querySelector('#author');
var UIbookIsbn = document.querySelector('#isbn');
var UIbookList = document.querySelector('#book-list');

// Book varructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI varructor

function UI() {};

UI.prototype.addBookToList = function(book) {
    var rowTemp = `
        <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" id="delete">X</a></td>
        </tr>
    `;

    UIbookList.insertAdjacentHTML('beforeend',rowTemp);
}

UI.prototype.removeBookItem = function(book) {
    book.remove();
}

UI.prototype.clearFields = function() {
    UIbookTitle.value = '';
    UIbookAuthor.value = '';
    UIbookIsbn.value = '';
}

UI.prototype.showAlert = function(message, className) {
    var alert = document.querySelector(`.alert.${className}`);
    if(!alert) {
        var alertTemp = `
            <p class="alert ${className}">${message}</p> 
        `;
        UIbookForm.insertAdjacentHTML('afterbegin', alertTemp);
        this.hideAlert();
    }
}

UI.prototype.hideAlert = function() {
    var alert = document.querySelector('.alert');
    setTimeout(function() {
        alert.remove();
    }, '3000');
}

var ui = new UI();

// Event Listners

UIbookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var bookTitle = UIbookTitle.value,
        bookAuthor = UIbookAuthor.value,
        bookIsbn = UIbookIsbn.value;

    console.log(bookAuthor);
    if(bookTitle == '' || bookAuthor == '' || bookIsbn == '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        var book = new Book(bookTitle, bookAuthor, bookIsbn);
        ui.addBookToList(book);
        ui.showAlert('Book Item added', 'success');
        ui.clearFields();
    }
})

UIbookList.addEventListener('click', function(e) {
    e.preventDefault();
    var clickedEl = e.target;
    if(clickedEl.id == 'delete') {
        var bookItem = clickedEl.parentElement.parentElement;
        ui.removeBookItem(bookItem);
        ui.showAlert('Book Item Removed', 'success');
    }
})