$(document).ready(function () {
  // console.log("This is a test");

  // Both modal buttons are hidden on the initial landing page
$(".modal-btn").hide();
$(".giphy-modal-btn").hide();


  // This function presents a waiting message and retrieves the requested website and places it in an iframe.
  function searchArchive(searchInputYear) {
    //  Randomized list for the Wayback URL
    var websiteList = [
      "www.google.com",
      "www.cnn.com",
      "www.yahoo.com",
      "www.people.com",
      "www.time.com",
    ];
    // Randomized list is assigned to the input
    const randomUrl = Math.floor(Math.random() * websiteList.length);
    console.log(randomUrl, websiteList[randomUrl]);
    const searchInputUrl = websiteList[randomUrl];
    console.log(searchInputUrl);
    // URL for the Wayback machine is getting dynamically created
    var queryURL =
      "https://cors-anywhere.herokuapp.com/http://archive.org/wayback/available?url=" +
      searchInputUrl +
      "&timestamp=" +
      searchInputYear +
      "1031";

    // Incorrect year format triggers the error message modal
    if(searchInputYear < 2000 || searchInputYear > 2020 || isNaN(searchInputYear)) {
      $(".modal-btn").click();
      return false;
    }


    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (response) {
        // Printing the entire object to console
        console.log(response);
        $("#giphy-modal").modal("show");
        // $("#insertTest").append(`
        //   <p class="text-white">Please Wait: Currently Loading the webpage for you</p>
        // `);
        // Gifs are added to the loading section
        // var gifOne = $("<img>").attr("src", "./assets/image/giphytrailer.gif");
        // var gifTwo = $("<img>").attr("src", "./assets/image/giphytakeoff.webp");
        // var gifThree = $("<img>").attr("src", "./assets/image/onfiregif.webp");
        // $("#insertTest").append(gifOne, gifTwo, gifThree);

        $("#iframeTest").attr("src", response.archived_snapshots.closest.url);
        // REDO THIS SECTION WITH THE DYNAMIC ISBN VALUE
        console.log($("#iframeTest")[0].contentWindow)
        $("#iframeTest2").attr(
          "src",
          "http://openlibrary.org/isbn/9784063872064"
        );
      })
      .catch(function (err) {
        console.log(`There was an error ${err.message}`);
        console.log(err);
      });
  }
  // On click function created for the Search Button
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    $(".welcome").hide();
    var searchInputYear = $("#searchInputYear").val().trim();
    searchArchive(searchInputYear);
  });
});
// Loading message and gifs are being displayed.  After load completes then they are removed.
$("#iframeTest").on("load", function () {
  $("#insertTest").empty();
  // $("#gifLocation").empty();
  $("#giphy-modal").modal("hide");
});
