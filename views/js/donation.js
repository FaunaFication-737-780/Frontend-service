//stript payment method
const stripePayment = async () => {
  var priceID;
  var payMode = 'payment';
  var radios = document.getElementsByName('amount');

  console.log($('#first_name').val());
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      //i made the radios value as the price id
      priceID = radios[i].value;
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  if (priceID == null) {
    console.log('did not select any amount');
  } else {
    //if price id is not null which means selected something
    if (
      $('#monthCheckbox').is(':checked') &&
      priceID == 'price_1GtQGvECm5TjDc1IFaRIJpCx'
    ) {
      payMode = 'subscription';
    }
    var firstName = $('#first_name').val();
    var lastName = $('#last_name').val();
    var email = $('#email').val();
    // await $.get( "/donatedPeople", { name: firstName+" "+lastName, email:email }, function(data){
    //     console.log(data);
    // });
    sessionStorage.setItem('name', firstName + ' ' + lastName);
    sessionStorage.setItem('email', email);

    var stripe = Stripe('pk_test_853qy8se4d90x2LxszV5GAi700pL7qNzqY');
    await stripe
      .redirectToCheckout({
        lineItems: [
          {
            price: priceID,
            quantity: 1,
          },
        ],
        mode: payMode,
        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: window.location.origin + '/success',
        cancelUrl: window.location.origin + '/cancel',
      })
      .then(function (result) {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          var displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
      });
  }
};

//checkout the input information from the donator
const checkInput = () => {
  //if user did not input anything, change the label color
  //and show the data-error
  if ($('#first_name').val() == '') {
    $('#first_name').removeClass('valid');
    $('#first_name').addClass('invalid');
    $('#firstNameLabel').css('color', 'red');
  } else {
    $('#first_name').removeClass('invalid');
    $('#first_name').addClass('valid');
    $('#firstNameLabel').css('color', '#00bfa5');
  }

  if ($('#last_name').val() == '') {
    $('#last_name').removeClass('valid');
    $('#last_name').addClass('invalid');
    $('#lastNameLabel').css('color', 'red');
  } else {
    $('#last_name').removeClass('invalid');
    $('#last_name').addClass('valid');
    $('#lastNameLabel').css('color', '#00bfa5');
  }
  //for email also check the format
  if ($('#email').val() == '' || !validateEmail($('#email').val())) {
    $('#email').removeClass('valid');
    $('#email').addClass('invalid');
    $('#emailLabel').css('color', 'red');
  } else {
    $('#email').removeClass('invalid');
    $('#email').addClass('valid');
    $('#emailLabel').css('color', '#00bfa5');
  }
  if (
    $('#first_name').val() == '' ||
    $('#last_name').val() == '' ||
    $('#email').val() == ''
  ) {
  } else {
    //if user input all information, go to stripe payment method
    stripePayment();
  }
};

//function to validate the email format
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//function to convert json to array
function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function (key) {
    result.push(json[key]);
  });
  return result;
}

let myJson;
const getAllDonators = async () => {
  //$("#species").empty()
  const response = await fetch('/allDonators');
  myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  let json = json2array(myJson);
  console.log(json);
  $('.page-loader').fadeOut(200);
  json[0].forEach((element) => {
    var text = `${element.name} donated at ${getDateDifferent(
      new Date(element.date)
    )} before`;

    $('.donators-collection').prepend("<p class='donator'>" + text + '</p>');
    // $('.donator').hide();
    // $('.donator:lt(4)').show();
  });
};

//get the time from now to the user donated
const getDateDifferent = (dataDate) => {
  var currentTimestamp = Date.now();
  var currentDate = new Date(currentTimestamp);

  const diffTime = Math.abs(currentDate - dataDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHour = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffMin = Math.ceil(diffTime / (1000 * 60));
  // console.log(diffTime + " milliseconds");
  // console.log(diffDays + " days");

  if (diffDays - 1 == 0) {
    if (diffHour - 1 == 0) {
      return diffMin - 1 + ' Mins';
    } else {
      return diffHour - 1 + ' Hours';
    }
  }

  return diffDays - 1 + ' Days';
};

$(document).ready(() => {
  $('#firstNameLabel').css('color', '#00bfa5');
  $('#lastNameLabel').css('color', '#00bfa5');
  $('#emailLabel').css('color', '#00bfa5');

  const socket = io();
  //open a socket to listen the data change
  socket.on('updateDonator', (data) => {
    var result = `${data.data.name} donated at ${getDateDifferent(
      new Date(data.data.date)
    )} before`;
    $('.donators-collection').prepend("<p class='donator'>" + result + '</p>');

    //have a loader shows for 700 ms to tell user the data updated
    $('.page-loader').fadeIn(0);
    $('.page-loader').fadeOut(700);

    console.log(data);
  });

  //when click on checkout button
  $('#donationBTN').click(function () {
    //stripePayment(radios)

    //call the checkout method
    checkInput();
  });
  //get all donators then display
  getAllDonators();

  //init the sidebar
  $('.sidenav').sidenav();
});
