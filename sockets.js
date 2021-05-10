//started the socket io
const socketIo = (io) => {
    //while a user connected 
    
    io.on('connection', (socket) => {

        console.log('a user connected');

        //while user disconnected 
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
        socket.emit('test','testing socket')
    })
}


module.exports ={openSocket: socketIo} ;