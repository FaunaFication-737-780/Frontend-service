//started the socket io
const socketIo = (io,app) => {
    //while a user connected 
    
    io.on('connection', (socket) => {

        console.log('a user connected');

        //while user disconnected 
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })

        //template socket for donation notification need to hook up with the button and can display via a toast
        socket.on('donation', () => {
            console.log("a user has clicked on donation")
            //io.emit

        })

        //realtime database update
        app.post('/updateData', (req,res)=>{
            var data = req.body
            console.log('the data from backend is ');
            console.log(data);
            io.emit('updateData',data)
            res.send("Data received")
        })
        
        
    })
}


module.exports ={openSocket: socketIo} ;