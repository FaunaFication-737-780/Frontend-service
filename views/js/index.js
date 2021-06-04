const socket = io()
socket.on('test',(msg) =>{
    console.log('test: '+msg);
})

$(document).ready(() => {
    document.cookie = ("name=Quokka")
    $('.collapsible').collapsible();
})
