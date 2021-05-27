const stripePayment = async () => {
    var priceID
    var payMode = 'payment'
    var radios = document.getElementsByName('amount');
    

    console.log($('#first_name').val());
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {

            priceID = radios[i].value
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    if (priceID == null) {
        console.log('did not select any amount');

    } else {
        if ($('#monthCheckbox').is(':checked') && priceID == 'price_1GtQGvECm5TjDc1IFaRIJpCx') {
            payMode = 'subscription'
        }
        var firstName = $('#first_name').val()
        var lastName = $('#last_name').val()
        var email = $('#email').val()
        await $.get( "/donatedPeople", { name: firstName+" "+lastName, email:email }, function(data){
            console.log(data);
        });

        var stripe = Stripe('pk_test_853qy8se4d90x2LxszV5GAi700pL7qNzqY');
        await stripe.redirectToCheckout({
                lineItems: [{
                    price: priceID,
                    quantity: 1
                }],
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



}

const checkInput = () => {


    if ($('#first_name').val() == "") {
        $("#first_name").removeClass("valid");
        $("#first_name").addClass("invalid");
        $("#firstNameLabel").css('color', 'red')
    } else {
        $("#first_name").removeClass("invalid");
        $("#first_name").addClass("valid");
        $("#firstNameLabel").css('color', '#00bfa5')
    }

    if ($('#last_name').val() == "") {
        $("#last_name").removeClass("valid");
        $("#last_name").addClass("invalid");
        $("#lastNameLabel").css('color', 'red')
    } else {
        $("#last_name").removeClass("invalid");
        $("#last_name").addClass("valid");
        $("#lastNameLabel").css('color', '#00bfa5')
    }

    if ($('#email').val() == ""||!validateEmail($('#email').val())) {
        $("#email").removeClass("valid");
        $("#email").addClass("invalid");
        $("#emailLabel").css('color', 'red')
    } else {
        $("#email").removeClass("invalid");
        $("#email").addClass("valid");
        $("#emailLabel").css('color', '#00bfa5')
    }
    if ($('#first_name').val() == "" || $('#last_name').val() == "" || $('#email').val() == "") {


    } else {
        stripePayment()
    }
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

$(document).ready(() => {
    $("#firstNameLabel").css('color', '#00bfa5')
    $("#lastNameLabel").css('color', '#00bfa5')
    $("#emailLabel").css('color', '#00bfa5')


    $("#donationBTN").click(function () {
        //stripePayment(radios)
        checkInput()

    })

})