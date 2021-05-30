const getAllCharities = async () => {
    await $.get('/allCharities', function (data) {
            //    console.log(data);
            //    console.log(typeof data);
            const charitiesData = JSON.parse(data).result
            console.log(charitiesData);

            //go through the data add the card in the html page
            for (let i = 0; i < charitiesData.length - 1; i += 2) {
                const element = charitiesData[i];
                const elementNext = charitiesData[i + 1]
                //set up the cards for one row
                var appendElement = '<div class="row">' +
                    ' <div class="col s4 offset-s2">' +
                    '<div class="card">' +
                    ' <div class="card-image">' +
                    '<img src="' + element.Image + '">' +
                    '  <span class="card-title">' + element.Name + '</span>' +
                    '  </div>' +
                    ' <div class="card-content">' +
                    '   <p>' + element.Description + '</p>' +
                    ' </div>' +
                    '   <div class="card-action">' +
                    '  <a target="_blank" rel="noopener noreferrer"' +
                    '   href="' + element.Website + '">Visit the Website' +
                    '<i class="material-icons">open_in_new</i>' +
                    '  </a>' +
                    ' </div>' +
                    ' </div>' +
                    '  </div>' +
                    '  <div class="col s4">' +
                    '         <div class="card">' +
                    '    <div class="card-image">' +
                    '      <img src="' + elementNext.Image + '">' +
                    '   <span class="card-title">' + elementNext.Name + '</span>' +
                    '   </div>' +
                    '   <div class="card-content">' +
                    '    <p>' + elementNext.Description + '</p>' +
                    '   </div>' +
                    ' <div class="card-action">' +
                    '     <a target="_blank" rel="noopener noreferrer"' +
                    '  href="' + elementNext.Website + '">Visit the Website' +
                    '  <i class="material-icons">open_in_new</i>' +
                    '  </a>' +

                    ' </div>' +
                    ' </div>' +
                    '</div>' +
                    ' </div>'

                $('.charities-container').append(appendElement)

            }
            //if the data is not even add the last card
            if (charitiesData.length % 2 != 0) {
                var lastData = charitiesData[charitiesData.length-1]

                var lastElement = 
                    '<div class="row">' +
                    '<div class="col s4 offset-s2">' +
                    ' <div class="card">' +
                    ' <div class="card-image">' +
                    '<img src="' + lastData.Image + '">' +
                    '<span class="card-title">'  + lastData.Name + '</span>' +
                    '</div>' +
                    '<div class="card-content">' +
                    ' <p>' + lastData.Description + '</p>' +
                    '</div>' +
                    '<div class="card-action">' +
                    '<a target="_blank" rel="noopener noreferrer" href="' + lastData.Website + '">Visit the Website' +
                    '<i class="material-icons">open_in_new</i></a></div></div></div></div>'
                    $('.charities-container').append(lastElement)
                
            }
        })
        .done(function () {

            //after all data loaded make the loader fade out
            $('.page-loader').fadeOut(200);

            }

        )



}


$(document).ready(() => {

    getAllCharities()

})