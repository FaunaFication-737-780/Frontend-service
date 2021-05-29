//init sidenav bar that displays cards
// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems);
// });


//convert string to camel case used to convert SpeciesIntro name into referencable format in API
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

//set up the map
let map = new L.map('mapid').setView([-27.833, 133.583], 4);
//gets geodata and displays on leaflet
const getData = (speciesName) => {
    var geoData;
    $.get('/mapData', {
        //only for showing an example
        name: speciesName
        //name: 'agileWallaby'
    }, function (data) {
        console.log(data);
        geoData = data.data
        //set up the map
        var container = L.DomUtil.get('mapid');
        if (container != null) {
            container._leaflet_id = null;
        }

        let map = new L.map('mapid').setView([-27.833, 133.583], 4);
        // create boundary box
        var boundaryBox = data.data.features[0].geometry.bbox
        console.log('bbox is ' + boundaryBox);
        var fixedBox = []


        boundaryBox.forEach(element => {
            console.log('box' + element);

        });
        fixedBox = [
            [boundaryBox[1], boundaryBox[0]],
            [boundaryBox[3], boundaryBox[2]]
        ]
        console.log('fixed box' + typeof fixedBox);



        //create the map
        L.tileLayer(
            'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1
            }).addTo(map);
        //add geojson file

        L.geoJson(geoData).addTo(map)
        //fit the boundary
        map.fitBounds(fixedBox)
    })


}
//API Fetch and Set
let myJson
const userAction = async () => {
    


    $("#species").empty()
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
    let json = json2array(myJson)
    console.log(json)


    json[0].forEach(element => {
        var imageId = "image" + element._id
        var nameId = "name" + element._id
        var pID = "p" + element._id
        $("#species").append(
            $("<div class='card small center'></div>").html(
                $("<div class='card-image waves-effect waves-block waves-light'>" +
                    "<div>" + "<img" + " id='" + imageId + "' src=" + element.image +"'style='border:none; width:100px />" + "</div>" +
                    "</div>" +
                    "<div class='card-content'>" +
                    "<a " + " id='" + nameId + "' class='card-title grey-text text-darken-4 species-redirect' href='#../species-cards.html'>" + element.name + "</a>" + "<p" + " id='" + pID + "'>" + element.status + "</p>" +
                    "</div>" +
                    "<div class='card-reveal'>" + "<span class='card-title grey-text text-darken-4'>" + element.habitat + "</span>" +
                    "</div>"
                ))
        )
    })

    //sets default landing card for species


    //getData(camelize(json[0][0].name))


    $('#mapBTN').click(function(){
        getData(camelize(json[0][0].name))
    })
    document.getElementById("species-name").innerText = json[0][0].name
    document.getElementById("species-pop").innerText = ("Population trend:   " + json[0][0].popTrend)
    document.getElementById("species-pic").src = json[0][0].image
    document.getElementById("species-status").innerText = json[0][0].status




    //Sets cookie to onclick to pass to next page
    var element = document.getElementsByClassName('species-redirect');
    for (let i = 0; i < element.length; i++) {
        let myParent = element[i].parentElement
        console.log("first child:   ", myParent.firstElementChild.innerHTML)
        element[i].addEventListener("click", function () {
            //document.cookie= ("name=" + myParent.firstElementChild.innerHTML)
            //console.log(document.cookie)
            //console.log(myParent)
            
            //when click a new animal, go to first tab
            var el = document.getElementById("tabs");
            var instance = M.Tabs.getInstance(el);
            instance.select('info-tab');

            
            $('#mapBTN').off("click")
            let species = myParent.firstElementChild.innerHTML
            $('#mapBTN').click(function(){
                getData(camelize(species))
            })
            

            json[0].forEach(element => {
                if (species == element.name) {
                    document.getElementById("species-name").innerText = element.name
                    document.getElementById("species-pop").innerText = ("Population trend:   " + element.popTrend)
                    document.getElementById("species-pic").src = element.image
                    document.getElementById("species-status").innerText = element.status



                }
            })



        }, false);
    }

}

const updateSpeciesInfo = (jsonData) => {
    console.log('this is update from socket');
    //testing the update data
    // if(!jsonData.data.name) console.log('name does not updated');
    // else console.log(jsonData.data.name);
    var data = jsonData.data
    var id = jsonData._id
    if (data.name != null) {
        var nameId = "name" + id
        var newName = document.getElementById(nameId)
        if (newName != null) {
            newName.innerText = data.name
        }


    }
    if (data.status != null) {
        var pId = "p" + id
        var newP = document.getElementById(pId)
        if (newP != null) {
            newP.innerText = data.status
        }

    }
    if (data.image != null) {
        var imageId = "image" + id
        var newImage = document.getElementById(imageId)
        if (imageId != null) {
            newImage.src = data.image
        }
    }




}
const newSpeciesInfo = (jsonData) => {
    var imageId = "image" + jsonData._id
    var nameId = "name" + jsonData._id
    var pID = "p" + jsonData._id

    console.log('this is insert from socket');

    $("#species").append(
        $("<div class='card small center'></div>").html(
            $("<div class='card-image waves-effect waves-block waves-light'>" +
                "<div class='activator'>" + "<img" + " id='" + imageId + "' src=" + jsonData.image + "'style='border:none; width:100px />" + "</div>" +
                "</div>" +
                "<div class='card-content'>" +
                "<a " + " id='" + nameId + "' class='card-title grey-text text-darken-4 species-redirect' href='#../species-cards.html'>" + jsonData.name + "</a>" + "<p" + " id='" + pID + "'>" + jsonData.status + "</p>" +
                "</div>" +
                "<div class='card-reveal'>" + "<span class='card-title grey-text text-darken-4'>" + jsonData.habitat + "</span>" +
                "</div>"
            ))
    )
}


$(document).ready(() => {

    $('.sidenav').sidenav();

    //init tabs
    $('.tabs').tabs();

    //init modal
    $('.modal').modal();
   
    
    userAction()

    const socket = io()
    socket.on('updateData', (data) => {

        if (data.type == 'insert') {
            newSpeciesInfo(data.data)

        }

        if (data.type == 'update') {
            updateSpeciesInfo(data)

        }
        //userAction()
        console.log('socket message: ');
        console.log(data);
    })

})