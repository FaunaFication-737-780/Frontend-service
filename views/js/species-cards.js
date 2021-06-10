//init sidenav bar that displays cards
// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems);
// });


//this count used for map the cards
var count = 1;

//convert string to camel case used to convert SpeciesIntro name into referencable format in API
function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

//set up the map
//let map = new L.map('mapid').setView([-27.833, 133.583], 4);
//gets geodata and displays on leaflet
const getData = (speciesName) => {
  var geoData;
  $.get(
    '/mapData',
    {
      //only for showing an example
      name: speciesName,
      //name: 'agileWallaby'
    },
    function (data) {
      console.log(data);
      geoData = data.data;
      //set up the map
      var container = L.DomUtil.get('mapid');
      if (container != null) {
        container._leaflet_id = null;
      }

      // create boundary box
      var boundaryBox = data.data.features[0].geometry.bbox;
      console.log('bbox is ' + boundaryBox);
      var fixedBox = [];

      //set the two lat-lon point for the boundary by bbox
      boundaryBox.forEach((element) => {
        console.log('box' + element);
      });
      fixedBox = [
        [boundaryBox[1], boundaryBox[0]],
        [boundaryBox[3], boundaryBox[2]],
      ];
      console.log('fixed box' + typeof fixedBox);

      //create the map
      //remove the load if we have all data ready
      //replace it with the map
      $('#mapLoader').replaceWith(
        ' <div id="mapid" class="center-block"></div>'
      );
      let map = new L.map('mapid').setView([-27.833, 133.583], 4);
      //create the map
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(map);
      //add geojson file

      L.geoJson(geoData).addTo(map);
      //fit the boundary
      map.fitBounds(fixedBox);
    }
  );
};
//API Fetch and Set
let myJson;
const userAction = async () => {
  $('#species').empty();
  const response = await fetch('/allSpeciesInfoData');
  myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log(myJson);

  function json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push(json[key]);
    });
    return result;
  }
  let json = json2array(myJson);
  console.log(json);

  json[0].forEach((element) => {
    var imageId = 'image' + element._id;
    var nameId = 'name' + element._id;
    var pID = 'p' + element._id;

    $('#species').append(
      $(
        "<div class='row species-card-modal'" +
          "<div class=' col s12'>" +
          "<div class='card center'>" +
          "<div class=' waves-effect waves-block waves-light'>" +
          "<div class='card-image'>" +
          '<img' +
          " id='" +
          imageId +
          "' src=" +
          element.image +
          ' />' +
          '</div>' +
          '</div>' +
          "<div class='card-content'>" +
          '<a ' +
          " id='" +
          nameId +
          "' class='card-title grey-text text-darken-4 species-redirect' href='#../species-cards.html'>" +
          element.name +
          '</a>' +
          '<p' +
          " id='" +
          pID +
          "'>" +
          element.status +
          '</p>' +
          '</div>' +
          "<div class='card-reveal'>" +
          "<span class='card-title grey-text text-darken-4'>" +
          element.habitat +
          '</span>' +
          '</div>' +
          '</div> </div></div>'
      )
    );
  });

  //sets default landing card for species

  //getData(camelize(json[0][0].name))

  //when click on the map tab
  //show the loader first to tell user we are process the data
  $('#mapBTN').click(function () {
    $('#mapid').replaceWith(
      '<div class="preloader-wrapper big active" id="mapLoader"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div> </div></div>'
    );

    getData(camelize(json[0][0].name));
  });
  document.getElementById('species-name').innerText = json[0][0].name;
  document.getElementById('species-pop').innerText =
    'Population trend:   ' + json[0][0].popTrend;
  document.getElementById('species-pic').src = json[0][0].image;
  document.getElementById('species-status').innerText = json[0][0].status;

  //show the card when it ready
  $('#species-pic').show();

  //

  //Sets cookie to onclick to pass to next page
  var element = document.getElementsByClassName('species-redirect');
  for (let i = 0; i < element.length; i++) {
    let myParent = element[i].parentElement;
    console.log('first child:   ', myParent.firstElementChild.innerHTML);
    element[i].addEventListener(
      'click',
      function () {
        //document.cookie= ("name=" + myParent.firstElementChild.innerHTML)
        //console.log(document.cookie)
        //console.log(myParent)
        $('#mapid').replaceWith(
          '<div class="preloader-wrapper big active" id="mapLoader"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div> </div></div>'
        );

        //when click a new animal, go to first tab
        var tabs = document.getElementById('tabs');
        var instance = M.Tabs.getInstance(tabs);
        instance.select('info-tab');

        //close the model if click on any animals
        var modal = document.getElementById('species-model');
        var instance = M.Modal.getInstance(modal);
        instance.close();

        //remove all the click listener for the map tab
        //avoid to get more than one data
        $('#mapBTN').off('click');
        let species = myParent.firstElementChild.innerHTML;
        $('#mapBTN').click(function () {
          $('#mapid').replaceWith(
            '<div class="preloader-wrapper big active" id="mapLoader"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div> </div></div>'
          );

          getData(camelize(species));
        });

        json[0].forEach((element) => {
          if (species == element.name) {
            //when user select new specie, show preloader and hide image
            $('#species-pic').hide();
            $('.page-loader').fadeIn(0);
            $('.page-loader').fadeOut(700);

            document.getElementById('species-name').innerText = element.name;
            document.getElementById('species-pop').innerText =
              'Population trend:   ' + element.popTrend;
            document.getElementById('species-pic').src = element.image;
            document.getElementById('species-status').innerText =
              element.status;
            const threatData = element.threats;
            document.getElementById('div0').innerHTML = '';
            for (let i = 0; i < threatData.length; i++) {
              let el = document.getElementById('div0');
              const content = threatData[i];
              element = document.createElement('li');
              element.className = 'collection-item';
              element.textContent = content;
              el = el.appendChild(element);
            }
            $('#species-pic').show();
          }
        });
      },
      false
    );
  }
};

const updateSpeciesInfo = (jsonData) => {
  console.log('this is update from socket');
  //testing the update data
  // if(!jsonData.data.name) console.log('name does not updated');
  // else console.log(jsonData.data.name);
  var data = jsonData.data;
  var id = jsonData._id;

  //the updated data would not have all the data so check why have been passed

  //then change the passed value
  if (data.name != null) {
    var nameId = 'name' + id;
    var newName = document.getElementById(nameId);
    if (newName != null) {
      newName.innerText = data.name;
    }
  }
  if (data.status != null) {
    var pId = 'p' + id;
    var newP = document.getElementById(pId);
    if (newP != null) {
      newP.innerText = data.status;
    }
  }
  if (data.image != null) {
    var imageId = 'image' + id;
    var newImage = document.getElementById(imageId);
    if (imageId != null) {
      newImage.src = data.image;
    }
  }
};
//if a new species has been added
const newSpeciesInfo = (jsonData) => {
  var imageId = 'image' + jsonData._id;
  var nameId = 'name' + jsonData._id;
  var pID = 'p' + jsonData._id;

  console.log('this is insert from socket');

  $('#species').append(
    $(
      "<div class='row species-card-modal'" +
        "<div class=' col s12'>" +
        "<div class='card center'>" +
        "<div class=' waves-effect waves-block waves-light'>" +
        "<div class='card-image'>" +
        '<img' +
        " id='" +
        imageId +
        "' src=" +
        jsonData.image +
        ' />' +
        '</div>' +
        '</div>' +
        "<div class='card-content'>" +
        '<a ' +
        " id='" +
        nameId +
        "' class='card-title grey-text text-darken-4 species-redirect' href='#../species-cards.html'>" +
        jsonData.name +
        '</a>' +
        '<p' +
        " id='" +
        pID +
        "'>" +
        jsonData.status +
        '</p>' +
        '</div>' +
        "<div class='card-reveal'>" +
        "<span class='card-title grey-text text-darken-4'>" +
        jsonData.habitat +
        '</span>' +
        '</div>' +
        '</div> </div></div>'
    )
  );
};

  
  // get specie name upon page load or specie selection    
const  setSpecieNameOnTab = (id, newvalue) => {
      var sName= document.getElementById(id);
      sName.innerHTML = newvalue;
}    

  //set specie Name in Insight tab
const specieInsight = async () => {
   setSpecieNameOnTab("specie-insight", document.getElementById("species-name").innerHTML);
};



//id="insightsBTN"><a href="#insights-tab"
const discoveryCall = async () => {

  

   //show preloader when user clicks on insight tab
   $('.page-loader').fadeIn(0);
   $('.page-loader').fadeOut(700);
   
   specieInsight();
   var tabSpecieName = document.getElementById("species-name").innerHTML;
      console.log("Insight Tab speciename: " + tabSpecieName);
 
      //send request with the name
      const response = await fetch('/DiscoveryNews?' + new URLSearchParams({
          name: tabSpecieName
    }));

 var myJson = await response.json(); //extract JSON from the http response
  if (myJson != null || myJson != ''){
        

    
   var counter = 0;
    counter = Object.keys(myJson.result.results).length;

        document.getElementById("resultLength").innerHTML = 'Total Number of Insights: ' + counter;
   
      var insightRecord = myJson.result.results;
      console.log(insightRecord);
      
       appenData(insightRecord);
  
   
    function appenData(data){   
         var insightContainer = document.getElementById("insight-data");
           for (let i = 0; i < counter; i++) {
              var div = document.createElement("div");
                  div.innerHTML =                 
                      `<p id="insightcenter" style="border: 1">${insightRecord[i].text}  </p> <p> </p> <p> </p>
                            <span> <strong>URL: </strong> ${insightRecord[i].url}  </span> </br>
                            <span> <strong>Author: </strong>  ${insightRecord[i].author} </span><p> </p><p> </p> <p> </p>
                            `
             insightContainer.appendChild(div);
    };
  }
 
  } 
  

}


/** Stop page display code  */


$(document).ready(() => {
  //init the side nav bar
  $('.sidenav').sidenav();

  //init tabs
  $('.tabs').tabs();

  //init modal
  $('.modal').modal();

  //while window loading
  $(window).on('load', function () {
    $('.page-loader').fadeOut(1500);
  });

  //click action on insight tab
  $('#insightsBTN').click(function () {
   
    discoveryCall();
    console.log('clicked insight');
  });
  //call the user action function
  userAction();

  //open the socket to listen any data change
  const socket = io();
  socket.on('updateData', (data) => {
    if (data.type == 'insert') {
      newSpeciesInfo(data.data);
    }

    if (data.type == 'update') {
      updateSpeciesInfo(data);
    }
    //userAction()
    console.log('socket message: ');
    console.log(data);
  });
});