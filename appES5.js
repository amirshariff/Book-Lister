function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function (book) {
	const list = document.querySelector('#book-list');
	const row = document.createElement('tr');
	row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
    `;
	list.appendChild(row);
};

UI.prototype.clearForm = function () {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''

}

UI.prototype.showAlert = function (message, className) {
    
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form = document.querySelector('.form')
    container.insertBefore(div, form)
    
    setTimeout(() => {
        div.remove()
    }, 3000);
}

UI.prototype.deleteBook = function (target) {

    if (target.className === 'delete') {

        target.parentElement.parentElement.remove()
        
    }
    
}

const form = document
	.querySelector('.form')
	.addEventListener('submit', function (e) {
		const title = document.querySelector('#title').value;
		const author = document.querySelector('#author').value;
		const isbn = document.querySelector('#isbn').value;

		const book = new Book(title, author, isbn);
		const ui = new UI();
        
        if (title === '' || author === '' || isbn === '') {
            
            ui.showAlert('Please fill in all the fields','error')
        } else {
            ui.showAlert('Book succefully added', 'success')
            ui.addBookToList(book);
            ui.clearForm()
            
        }


		e.preventDefault();
    });
    
const bookList = document.querySelector('#book-list').addEventListener('click', function (e) {
        
    const ui = new UI()
    ui.deleteBook(e.target)
    ui.showAlert('Successfully deleted','success')
    
    e.preventDefault()
    })
