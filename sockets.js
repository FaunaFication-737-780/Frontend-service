//started the socket io
const socketIo = (io,app) => {
    //while a user connected 
    
    io.on('connection', (socket) => {

        console.log('a user connected');

        //while user disconnected 
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
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