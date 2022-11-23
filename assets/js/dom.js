const addBook = () => {
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;
    const object = {
        id: +new Date(),
        title: title,
        author: author,
        year: year,
        isCompleted: isCompleted,
    };

    books.push(object);
    document.dispatchEvent(new Event(RENDER_EVENT));
    updateDataFromStorage();
};

const makeBook = (book) => {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book-item");
    bookItem.innerHTML = "";

    if (book.isCompleted) {
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <div class="action">
                <button class="incomplete" onclick="moveToUnCompleted(${book.id})">
                    - Belum Selesai
                </button>
                <button class="trash" onclick="removeBookFromBookshelf(${book.id})">
					<i class="bi bi-trash2"></i>
                </button>
            </div>`;
    } else {
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <div class="action">
                <button class="complete" onclick="moveToCompleted(${book.id})">
                    + Selesai dibaca
                </button>
                <button class="trash" onclick="removeBookFromBookshelf(${book.id})">
					<i class="bi bi-trash2"></i>
                </button>
            </div>`;
    }

    return bookItem;
};

const moveToCompleted = (bookId) => {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;
    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    updateDataFromStorage();
};

const moveToUnCompleted = (bookId) => {
    const bookTarget = findBook(bookId);
    if (bookTarget === null) return;
    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    updateDataFromStorage();
};

const removeBookFromBookshelf = (bookId) => {
    const bookTarget = findBookIndex(bookId);
    if (bookTarget === -1) return;
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    updateDataFromStorage();
};

const searchBook = (string) => {
    const bookItem = document.querySelectorAll(".book-item");
    for (const item of bookItem) {
        const title = item.childNodes[1];
        if (title.innerText.toUpperCase().includes(string)) {
            title.parentElement.style.display = "";
        } else {
            title.parentElement.style.display = "none";
        }
    }
};

const inputSection = document.getElementById("inputSection");
const showInput = document.getElementById("showInput");
const hideInput = document.getElementById("hideInput");

showInput.addEventListener("click", () => {
    inputSection.style.display = "block";
    showInput.style.display = "none";
});

hideInput.addEventListener("click", () => {
    inputSection.style.display = "none";
    showInput.style.display = "flex";
});