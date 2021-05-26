const stripePayment = async (radios) => {
    var priceID
    var payMode = 'payment'
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            
            priceID = radios[i].value
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    if ($('#monthCheckbox').is(':checked') && priceID == 'price_1GtQGvECm5TjDc1IFaRIJpCx') {
        payMode = 'subscription'
    }
   
    var stripe = Stripe('pk_test_853qy8se4d90x2LxszV5GAi700pL7qNzqY');
    stripe.redirectToCheckout({
        lineItems: [{price: priceID, quantity: 1}],
        mode: payMode,
        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: 'https://localhost:3000/success.html',
        cancelUrl: 'https://localhost:3000/canceled.html',
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


$(document).ready(() => {
    var radios = document.getElementsByName('amount');
    console.log(radios);

    $("#donationBTN").click(function () {
        stripePayment(radios)
    })

})