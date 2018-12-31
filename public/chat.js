
$(function () {
	//make connection
	var socket = io.connect('http://localhost:8888')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//Emit message to server
	send_message.click(function () {
		socket.emit('clientmessage', { message: message.val() })
	})

	//Listen on new_message from server
	socket.on("serveremit", (data) => {
		feedback.html('');
		message.val('');
		var chatter = (username.val() === data.username) ? "Me" : data.username;

		if (chatter === "Me")
			chatroom.append("<p class='message'>" + chatter + ": " + data.message + "</p>");
		else
			chatroom.append("<p class='memessage'>" + chatter + ": " + data.message + "</p>");
	})

	//Emit a username to server
	send_username.click(function () {
		socket.emit('user_login', { username: username.val() })
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});