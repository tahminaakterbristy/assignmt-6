// get error handle id
const errorDiv = document.getElementById('error-handle');

// Toggle Area
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Search Books
const searchBooks = () => {   
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // display spinner 
    toggleSpinner('block');
    searchInput.value = '';
    // api url
    const url = (`https://openlibrary.org/search.json?q=${searchText}`);
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResults(data))
}

// Display Books
const displaySearchResults = books => {
    // number of all books
    const totalBooksNumber = document.getElementById('total-result-number');
    totalBooksNumber.innerText = `Search Result: ${books.numFound} Books...`
    // search results
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // error handle
    if(books.numFound === 0) {
        errorDiv.innerText = 'No Results Found';
    }
    else {
        errorDiv.innerText = '';
    }
    // all books array
    const booksArray = books.docs;
    booksArray?.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title text-danger">Name: ${book.title}</h3>
                    <h6 class="card-title">Author: ${book.author_name}</h6>
                    <p class="card-text">Publisher: ${book.publisher}</p>
                    <p class="card-text">Date of First Published: ${book.first_publish_year}</p>
                </div>
            </div>
        `
        searchResult.appendChild(div);
    });
    // display spinner 
    toggleSpinner('none');
}
