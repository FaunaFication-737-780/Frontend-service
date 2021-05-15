$(document).ready(() => {

    console.log('DOM is loaded')
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, options);
    });


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

        //creates basic collapsible list of species
        json[0].forEach(element => {
            $("#species").append($("<li>").html($("<div class='collapsible-header teal'>" + element.name +  "</div>"
                + "<div class='collapsible-body'>" + "<span>" +  element.name + "</span>" +"<a  href='../leaflet.html' class=\"waves-effect waves-light btn species-redirect\"> Button</a>"   +"</div>")))


        })




        //Sets cookie to onclick to pass to next page
        var element= document.getElementsByClassName('species-redirect');
        for(let i=0;i<element.length;i++){
            let myParent = element[i].parentElement
            //console.log("first child:   ",myParent.firstElementChild.innerHTML)
            element[i].addEventListener("click", function(){
                document.cookie= ("name=" + myParent.firstElementChild.innerHTML)
                //console.log(document.cookie)
                //console.log(myParent)
            }, false);
        }




    }
    userAction()

})