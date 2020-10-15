$(document).ready(function() {
    
// var images = ["https://giphy.com/gifs/trippy-blue-tech-l1J9PC411qxTzlp2U", "https://giphy.com/gifs/time-endless-history-3ov9jU4ycPvfrPTsly"];

//  for ( var i = 0; i < images.length; i++ ) {
//    console.log(images[i])

// $("#trippy-button").on("click, function") {
//   $("<img>").attr()

// }

  
    $("#time-button").on("click", function() {

    var timeSearch = "https://api.giphy.com/v1/gifs/random?api_key=xoPsOCTW5H8YQzMdzHNT2r8KjsFfzJlc&tag=backtothefuture&rate=g"
  
    $.ajax({
           url: timeSearch,
           method: "GET",
    })
           .then(function(response){
            
            var imageUrl = response.data.image_original_url;

            var timeImage = $("<img>");

            timeImage.attr("src", imageUrl);
          timeImage.attr("alt", "time image");


                
          $("#images").prepend(timeImage)

});
    });
});
      

// var results = response.data;
               
            // for(i = 0; i < results.length; i++) {
            
            // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {   
            
            //     var images = $("<div>");
            //     var rating = results[i].rating;


          
      
          // .then(function(response) {
//             var imageUrl = response.data.image_original_url;
//             var timeImage = $("<img>");

//             timeImage.attr("src", imageUrl);
//           timeImage.attr("alt", "time image");
//           $("#images").prepend(timeImage);
//          });
                   
// });

        

    



    








    
        

    
      
      
      
      
    


































