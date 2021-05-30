//when user success donated store the data into database for display in the donation page
var storeIntoDatabase = async () => {

    //get the session from the checkout 
    var name = sessionStorage.getItem('name')
    var email = sessionStorage.getItem('email')
    //make sure we the user actually paid not just go to this page
    if (name != null && email != null) {
        console.log('the name of the session is: ' + name);
        console.log("the email of the session is: " + email);

        //send the user info to the backend 
        await $.get("/donatedPeople", {
            name: name,
            email: email
        }, function (data) {
            console.log(data);
        });
        //remove the session 
        await sessionStorage.removeItem('name')
        await sessionStorage.removeItem('email')
    } else {
        console.log('no session');
    }
}
$(document).ready(()=>{
    storeIntoDatabase()

})