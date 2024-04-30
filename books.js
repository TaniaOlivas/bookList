let bookSearch = []
let booksToRead = []
const bookResults = (objects) => {
    let resultDiv = $(".searchResults")
    let index = 0

    Object.values(objects.items).forEach(function (object) {
        let resultSection = $(`<div class = "resultSection"></div>`)
        let bookImage = $(`<div><img src = "${object.volumeInfo.imageLinks.smallThumbnail}" /></div>`)
        let infoDiv = $(`<div class = "resultDetailsDiv"></div>`)
        let bookTitle = $(`<p class = "bookTitle">Title: ${object.volumeInfo.title}</p>`)
        let bookAuthor = $(`<p class = "bookAuthor">Author: ${object.volumeInfo.authors[0]}</p>`)
        let addBookButton = $(`<button onclick="addBook(event)" id ="${index}" class = "tanBtn">Add to Reading List</button>`)
        index = index + 1

        bookSearch.push({
            title: `${object.volumeInfo.title}`,
            author: `${object.volumeInfo.authors[0]}`,
            imageLink: `${object.volumeInfo.imageLinks.smallThumbnail}`
        })

        infoDiv.append(bookTitle, bookAuthor, addBookButton)
        resultSection.append(bookImage, infoDiv)
        resultDiv.append(resultSection)
    });
};
const addBook = (event) => {
    $(`.bookList`).empty()
    let index = event.target.id

    booksToRead.push({
        title: `${bookSearch[index].title}`,
        author: `${bookSearch[index].author}`,
        imageLink: `${bookSearch[index].imageLink}`,
        review: ""
    })

    $(".animations .createdAnimation").fadeIn(2000, "linear")
    $(".animations .createdAnimation").fadeOut(2000, "linear")

    showBooks()
    $("#searchTitle").val(" ")
    $(".searchResults").empty()

}

const manuallyCreate = () => {
    $(`.bookList`).empty()
    let manualTitle = $(`#title`).val()
    let manualAuthor = $(`#author`).val()

    booksToRead.push({
        title: `${manualTitle}`,
        author: `${manualAuthor}`,
        imageLink: "",
        review: ""
    })

    $(`#title`).val(" ")
    $(`#author`).val(" ")
    $(".animations .createdAnimation").fadeIn(2000, "linear")
    $(".animations .createdAnimation").fadeOut(2000, "linear")
    showBooks()
}

const showBooks = () => {
    let bookListDiv = $(`.bookList`)
    let index = 0

    booksToRead.forEach(book => {
        let wholeDiv = $(`<div id = "wholeSection" class = "${index}"></div>`)
        let bookImage = $(`<div class="bookImage"><img src = "${book.imageLink}" /></>div`)
        let infoDiv = $(`<div class = "detailsDiv"></div>`)
        let bookTitle = $(`<p class = "bookTitle">Title: ${book.title}</p>`)
        let bookAuthor = $(`<p class = "bookAuthor">Author: ${book.author}</p>`)
        let bookReview = $(`<p class = "bookReview">${book.review}</p>`)
        let updateBtn = $(`<button onclick="updateBook(event)" id = "${index}" class = "blueBtn">Update to add a Review</button>`)
        let deleteBtn = $(`<button onclick="deleteBook(event)" id = "${index}" class = "blueBtn">Delete</button>`)

        index = index + 1
        infoDiv.append(bookTitle, bookAuthor, bookReview, updateBtn, deleteBtn)
        wholeDiv.append(bookImage, infoDiv)
        bookListDiv.append(wholeDiv)
    });
}

const updateBook = (event) => {
    $(`.bookList`).empty()
    let index = event.target.id
    let userReview = prompt(`Add a Review:`)
    booksToRead[index].review = userReview
    showBooks()
}

const deleteBook = (event) => {
    let index = event.target.id
    booksToRead.splice(index, 1)
    $(`div .${index}`).remove()

    $(".animations .deleteAnimation").fadeIn(2000, "linear")
    $(".animations .deleteAnimation").fadeOut(2000, "linear")
}
const getData = () => {
    bookSearch = []

    $(".searchResults").empty()
    let title = $("#searchTitle").val()
    let APIKey = "AIzaSyBFwgVd0mk8AyhraRSm71loZgaALIDazvs"
    $.ajax({
        type: 'GET',
        url: `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&printType=books&maxResults=5&key=${APIKey}`,
        dataType: 'json',
        success: function (result, status, xhr) {
            bookResults(result);
        },
        error: function (xhr, status, error) {
            alert(
                'Result: ' +
                status +
                ' ' +
                error +
                ' ' +
                xhr.status +
                ' ' +
                xhr.statusText
            );
        },
    });
};

const setUp = () => {
    $(".deleteAnimation").hide()
    $(".createdAnimation").hide()
}

$(document).ready(setUp);