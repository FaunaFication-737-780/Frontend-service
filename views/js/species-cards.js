document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});

$(document).ready(() => {

    console.log('DOM is loaded')
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, options);
    });
    $('.tabs').tabs();




    //API Fetch and Set
    let myJson
    const userAction = async () => {
        const response = await fetch('/allSpeciesInfoData');
        myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson)

        function json2array(json) {
            var result = [];
            var keys = Object.keys(json);
            keys.forEach(function (key) {
                result.push(json[key]);
            });
            return result;
        }
        let json =json2array(myJson)
        console.log(json)


        json[0].forEach(element =>{
            $("#species").append(
                $("<div class='card small center'></div>").html(
                    $("<div class='card-image waves-effect waves-block waves-light'>"+
                        "<div class='activator'>"+ "<img src="  + element.image  + "'style='border:none; width:100px />" +"</div>"+
                        "</div>"+
                        "<div class='card-content'>" +
                        "<a class='card-title grey-text text-darken-4 species-redirect' href='#../species-cards.html'>" + element.name +"</a>" + "<p>" +  element.status  + "</p>" +
                        "</div>"+
                        "<div class='card-reveal'>" + "<span class='card-title grey-text text-darken-4'>" + element.habitat + "</span>"+
                        "</div>"
                    ))
            )
        })








        //Sets cookie to onclick to pass to next page
        var element= document.getElementsByClassName('species-redirect');
        for(let i=0;i<element.length;i++){
            let myParent = element[i].parentElement
            console.log("first child:   ",myParent.firstElementChild.innerHTML)
            element[i].addEventListener("click", function(){
                //document.cookie= ("name=" + myParent.firstElementChild.innerHTML)
                //console.log(document.cookie)
                //console.log(myParent)
                let species = myParent.firstElementChild.innerHTML


                json[0].forEach(element => {
                    if (species == element.name)
                    {
                        document.getElementById("species-name").innerText = element.name
                        document.getElementById("species-pic").src = element.image
                    }
                })



            }, false);
        }








    }
    userAction()

})