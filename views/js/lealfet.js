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


$(document).ready(() => {
    console.log('DOM is loaded')

    getData()
    //API Fetch and Set
    let myJson
    const userAction = async () => {
        const response = await fetch('/quokkaData');
        myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson)
        document.getElementById('species').innerText = myJson.name
        document.getElementById('info').innerText = myJson.about


        //json data supports multiple coords for scalability for later production

        let COORDS = []


        function json2array(json) {
            var result = [];
            var keys = Object.keys(json);
            keys.forEach(function (key) {
                result.push(json[key]);
            });
            return result;
        }



    }
    userAction()




    //CALL FAAS FOR DISCOVERY API DATA
    let newsJson //using FaaS to imitate data from Watson Discovery as documentation is unclear
    const sentimentAction = async () => {
        const response = await fetch('/quokkaNews');
        newsJson = await response.json(); //extract JSON from the http response
        console.log(newsJson)
        document.getElementById('article').innerText = newsJson.article
        document.getElementById('sentiment').innerText = ("sentiment:   " + newsJson.sentiment)
        document.getElementById('article-ref').href = newsJson.url
    }
    sentimentAction()



})