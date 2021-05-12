$(document).ready(() => {
    console.log('DOM is loaded')
    //initialize leaflet
    var mymap = L.map('mapid').setView([-27.833, 133.583], 4);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYnJ5Y2V3aWxraW5zb240MyIsImEiOiJja245bnRqYzcwejN1MnNvMG0zczI0YzVhIn0.bspf_6DxvHvi4pm0eOOKkA'
    }).addTo(mymap);


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

        //Some problem with passing nested array and cannot call JSON.parse()
        /*
        myJson.geoData.forEach(element=> {COORDS.push(json2array(myJson.geoData))})
        console.log(COORDS)
        */
        /*
        polygon =L.polygon(COORDS,{color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5}).addTo(mymap)
        polygon.bindPopup("Drastically decreased, decimated by stray cats");
        */
        //

    }
    userAction()

//SET POLYGON
//doing manually since DB data is abit messy
    polygon = L.polygon([[-31.82066202602414, 115.76475456437339], [-34.784389644249266, 116.10364812331744], [-33.715487257392525, 115.05364100657803]], {color: 'red'}).addTo(mymap)
    polygon.bindPopup("The mainland population has been devasted by stray cats with the population scattered across the coast of Western Australia in small groups *usually 50 or less in a tribe")
//manual for rotnest island add to db
    circle = L.circle([-32.00522031995993, 115.5181870410761], {
        color: 'blue',
        fillColor: '#7fff00',
        fillOpacity: 0.5,
        radius: 6500
    }).addTo(mymap)
    circle.bindPopup("No Natural threats, very popular tourist location, stable population");


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


//var marker = L.marker([-27.833, 150.01]).addTo(mymap);
    /*var circle = L.circle([-27.833, 152.55], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);

     */

})
