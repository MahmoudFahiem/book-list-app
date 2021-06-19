// UI Variables
var UIbookForm = document.querySelector('#book-form');
var UIbookTitle = document.querySelector('#title');
var UIbookAuthor = document.querySelector('#author');
var UIbookIsbn = document.querySelector('#isbn');
var UIbookList = document.querySelector('#book-list');

// Book Constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor

function UI() {};

UI.prototype.addBookToList = function(book) {
    var rowTemp = `
        <tr>
          <td>${book.title}</td>
          <td>${book.auhor}</td>
          <td>${book.isbn}</td>
          <td><a href="#" id="delete">X</a></td>
        </tr>
    `;

    UIbookList.insertAdjacentHTML('beforeend',rowTemp);
}

UI.prototype.clearFields = function() {
    UIbookTitle.value = '';
    UIbookAuthor.value = '';
    UIbookIsbn.value = '';
}

// Event Listners

UIbookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var bookTitle = UIbookTitle.value,
        bookAuthor = UIbookAuthor.value,
        bookIsbn = UIbookIsbn.value;
    
    var book = new Book(bookTitle, bookAuthor, bookIsbn);
    var ui = new UI();

    ui.addBookToList(book);
    ui.clearFields();
})

UIbookList.addEventListener('click', function(e) {
    e.preventDefault();
    const clickedEl = e.target;
    if(clickedEl.id == 'delete') {
        clickedEl.parentElement.parentElement.remove();
    }
})