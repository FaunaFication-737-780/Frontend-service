const getData = () => {
    var geoData;
    $.get('/mapData', {
        //only for showing an example

        name: 'quokka'
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







$(document).ready(() => {
    let x =document.cookie
    console.log(x)

    userAction().then(r => console.log(json))
    //API Fetch and Set


    getData()









})