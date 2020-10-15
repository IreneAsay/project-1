function fetchBooks(offset = 0) {
  var queryURL = `http://openlibrary.org/search.json?q=isbn&offset=${offset}`;

  return $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var books = response.docs; // array

    var booksWithPublishYear = books.filter(function (book) {
      return book.publish_year;
    });

    var booksWithPublishYearOver1994 = booksWithPublishYear.filter(function (
      book
    ) {
      if (Array.isArray(book.publish_year)) {
        // loop over the array of values
        // check if each if one is greater that 1994
        var results = book.publish_year.filter(function (year) {
          return year >= 1994;
        });

        return results.length > 0;
      }
    });

    // We return an object for us to use later
    return {
      books: booksWithPublishYearOver1994,
      cursor: response.start,
      numberOfResults: response.numFound,
    };
  });
}

const DESIRED_NUMBER_OF_RESULTS = 100;

function getBookResults() {
  const totalBooks = [];
  var results = fetchBooks();
  totalBooks.push(results.books);

  while (totalBooks < DESIRED_NUMBER_OF_RESULTS) {
    let newResults = fetchBooks(results.numberOfResults);
    results = newResults;
    totalBooks.push(newResults.books);
  }
}

getBookResults();
