$(document).ready(function() {
	 socket = io.connect(), name = '';
	var	$inp_msg = $('#inp_msg'),
		$messages = $('#messages');
	
	$('#chat_form').submit(function(e){
		// prevent form submission and reloading of the page
		e.preventDefault();
		
		// send to server
		socket.emit('send message', {user:name, msg:$inp_msg.val()});
		
		// reset input field to black
		$inp_msg.val('');
	});
	
	socket.on('connect', function(){
		name = prompt("What's your name?");
		socket.emit('add user', name);
	});
	
	// listen to global messages and update $messages
	socket.on("send message", function(data){
		var ui_class= 'others_msg';
		if(data.user == name){
			ui_class='my_msg';
		}else if(data.user == 'system'){
			ui_class='system_msg';
		}
		
		$messages.append('<li class="'+ui_class+'"><b>Global-'+data.user+': </b>'+data.msg+'</li>');
	});
	
	// listen to room messages and update $messages
    socket.on("room message", function(data){
        var ui_class= 'others_msg';
        if(data.user == name){
            ui_class='my_msg';
        }else if(data.user == 'system'){
            ui_class='system_msg';
        }
        
        $messages.append('<li class="'+ui_class+'"><b>Room-'+data.user+': </b>'+data.msg+'</li>');
    });
    
    // listen to room messages and update $messages
    socket.on("private message", function(data){
        var ui_class= 'others_msg';
        if(data.user == name){
            ui_class='my_msg';
        }else if(data.user == 'system'){
            ui_class='system_msg';
        }
        
        $messages.append('<li class="'+ui_class+'"><b>Private-'+data.user+': </b>'+data.msg+'</li>');
    });
});