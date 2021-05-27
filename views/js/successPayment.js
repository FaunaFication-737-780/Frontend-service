var storeIntoDatabase = async () => {

    var name = sessionStorage.getItem('name')
    var email = sessionStorage.getItem('email')
    if (name != null && email != null) {
        console.log('the name of the session is: ' + name);
        console.log("the email of the session is: " + email);

        await $.get("/donatedPeople", {
            name: name,
            email: email
        }, function (data) {
            console.log(data);
        });
        await sessionStorage.removeItem('name')
        await sessionStorage.removeItem('email')
    } else {
        console.log('no session');
    }
}
$(document).ready(()=>{
    storeIntoDatabase()

})