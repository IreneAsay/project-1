$(document).ready(function () {
  console.log("This is a test");
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

  function searchArchive(searchInputUrl, searchInputYear) {
    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL =
      "https://cors-anywhere.herokuapp.com/http://archive.org/wayback/available?url=" +
      searchInputUrl +
      "&timestamp=" +
      searchInputYear +
      "0601";

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (response) {
        // Printing the entire object to console
        console.log(response);
        var status = $("<p>").text(response.archived_snapshots.closest.status);
        var time = $("<p>").text(response.archived_snapshots.closest.timestamp);
        var urlTest = $("<p>").text(response.archived_snapshots.closest.url);
        $("#insertTest").append(`
          <p>Currently Loading the webpage for you</p>
        `);
        $("#iframeTest").attr("src", response.archived_snapshots.closest.url);
      })
      .catch(function (err) {
        console.log(`There was an error ${err.message}`);
        console.log(err);
      });
  }
  // searchArchive();

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    // var timeValue = inputCity;
    var searchInputUrl = $("#searchInputUrl").val().trim();
    var searchInputYear = $("#searchInputYear").val().trim();
    searchArchive(searchInputUrl, searchInputYear);
    // localStorage.setItem(timeValue, inputCity);
  });
});

$("#iframeTest").on("load", function () {
  $("#insertTest").empty();
});
