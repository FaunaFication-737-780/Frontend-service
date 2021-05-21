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
        var map = new L.map('mapid').setView([-27.833, 133.583], 4);
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

function json2array(json) {
    let result = [];
    let keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });
    return result;
}



//API Fetch and Set
let json
const userAction = async () => {
    const response = await fetch('/findSpeciesInfoData');
    let myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    //console.log(myJson)
    let json =json2array(myJson)
    console.log(json)
    document.getElementById("species-name").innerHTML = json[0]["name"];
    document.getElementById("species-pop").innerHTML = ("Population:  " + json[0]["popTrend"] + " || " + json[0]["popEst"] );
    document.getElementById("species-status").innerHTML = ("Status:  " + json[0]["status"]);
}

let myJson
const userAction2 = async () => {
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

    //creates basic collapsible list of species
    json[0].forEach(element => {
        if (getCookie("name") == element.name){
            document.getElementById("species-name").innerHTML = element.name;
            document.getElementById("species-pop").innerHTML = ("Population:  " + element.popTrend + " || " + element.popEst );
            document.getElementById("species-status").innerHTML = ("Status:  " + element.status);
            document.getElementById("species-pic").src = element.image.toString()
        }

    })

    //test
    //Sets cookie to onclick to pass to next page
    var element = document.getElementsByClassName('species-redirect');
    for (let i = 0; i < element.length; i++) {
        let myParent = element[i].parentElement
        //console.log("first child:   ",myParent.firstElementChild.innerHTML)
        element[i].addEventListener("click", function () {
            document.cookie = ("name=" + myParent.firstElementChild.innerHTML)
            //console.log(document.cookie)
            //console.log(myParent)
        }, false);
    }

}



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}





$(document).ready(() => {
    let x =document.cookie
    console.log(x)
    console.log("Cookie:   " + getCookie("name"))
    console.log("camelcase:   " + camelize(getCookie("name")))
    userAction2(getCookie("name"))
    //API Fetch and Set


    getData(camelize(getCookie("name")))









})