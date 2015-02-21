var express = require("express"),
	path = require('path'),
	app = new express(),
	server = require('http').createServer(app),
	io = require("socket.io").listen(server);
app.use(express.static('public'));

server.listen(3000);

app.get("/chat", function(req, res){
	res.sendFile(__dirname+"/public/chat.html");
});

var users = {}, rooms = {global:{}};
io.sockets.on('connection', function(socket){
	socket.on('add user', function(name){
	    try{
    		users[name] = {
    		   socket: socket,
    		   rooms: {global:true}
    		};
    		
    		socket.username = name;
    		
    		socket.broadcast.emit('new message', {user:'system',msg: name+' joined..'});
    		socket.emit('new message', {user:'system',msg:' You are joined..'});
    		
    		console.log('users:',users);
	    }catch(e){
	        console.log('error in add user:',e);
	    }
	});
	
	// global message
	socket.on('send message', function(data){
		//socket.broadcast.emit('new message', msg);
		io.sockets.emit('send message', data);
	});

	// private message
    socket.on('private message', function(data){
        // send private message to user
        users[data.user].socket.emit('private message', data.data);
    });

    // room message
    socket.on('room message', function(data){
        //console.log('in room message:',data);
        
        console.log(users,'<<o>>',rooms);
        
        try{
            // send private message to user
            socket.broadcast.to(data.room).emit('room message', data.data);
        }catch(e){
            console.log('error in room message:',e);
        }
    });
	
    socket.on('create room', function(data){
        //console.log('in create room:',data);
        try{
            // add new room to rooms list
            if(data && data.room && data.room != 'global' && !rooms[data.room]){
                rooms[data.room] = {users:{}};
                
                rooms[data.room].users[socket.username] = socket.username;
                users[socket.username].rooms[data.room] = true;
                
                console.log(socket.username+'<createroom>rooms:',rooms);
                
                // add user to the room
                socket.join(data.room);
                
                // send 'room created' message
                socket.broadcast.to(data.room).emit('room created', {room: data.room});
            }else{
                socket.emit('create room error', {msg: 'already exists/invalid room value'});
            }
        } catch(e){
            console.log('error in create room:',e);
        }
    });

    socket.on('join room', function(data){
        //console.log('in join room:',data);
        try{
            if(data && data.room && rooms[data.room]){
                rooms[data.room].users[socket.username] = socket.username;
                users[socket.username].rooms[data.room] = true;
                
                socket.join(data.room);
                

                console.log(socket.username+'<joinroom>rooms:',rooms);
                
                
                // send 'joined room' message
                //io.sockets.in('room1').emit('function', 'data1', 'data2');
                socket.broadcast.to(data.room).emit('joined room', {user: socket.username});
            }else{
                socket.emit('create room error', {msg: 'room does not exist'});
            }
        }catch(e){
            console.log('error in join room:',e);
        }
    });
    
    socket.on('leave room', function(data){
        // remove user from the room
        delete(rooms[data.room].users[socket.username]);
        delete(users[socket.username].rooms[data.room]);
        
        // remove user to the room
        socket.leave(data.room);
        
        // send 'left room' message
        socket.broadcast.to(data.room).emit('left room', {user: socket.username});
    });
    
    socket.on('kick user', function(data){
        // kick user from room
        delete(rooms[data.room].users[data.user]);
        delete(users[data.user].rooms[data.room]);

        // remove user to the room
        users[data.user].socket.leave(data.room);
        
        // send 'kicked user' message
        socket.broadcast.to(data.room).emit('kicked user', {user: socket.username});
    });
    
	socket.on('disconnect', function(){
	    // @todo iterate and remove the user from other rooms. No need to send any message
	    
		delete users[socket.username];
		
		socket.broadcast.emit('new message', {name:'system',msg: socket.username+' disconnected..'});
	});
});