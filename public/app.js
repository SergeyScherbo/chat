// Make connection
/*
  when we load index.html we load app.js as well.
  Since on the server we have setup for socket.io and here we do aswell,
  we create websocket connection between client and server
*/
const socket = io.connect('http://localhost:3000');

// dom elements
const chat    = document.querySelector('.chat'), // chat
      message = document.querySelector('.field'), // our message
      modalBtn = document.querySelector('.modal__inner button'),
      chatBtn  = document.querySelector('.send'),
      feedback = document.querySelector('.feedback');

let name = '';

modalBtn.addEventListener('click', function() {
  const input = document.querySelector('.modal__inner input');
  const modal = document.querySelector('.modal__bg');
  name = input.value;

  modal.classList.add('is-hidden');
});

// Receive data from client and send it to the server
chatBtn.addEventListener('click', function() {
  socket.emit('chat-msg', {
    message: message.value,
    handle: name
  });

  message.value = '';
});

message.addEventListener('keypress', function() {
  socket.emit('typing', name);
});

// get back data from server and append it to the page
socket.on('chat-msg', function(data) {
  feedback.textContent = '';

  const userName = data.handle;
  const userMsg  = data.message;
  chat.innerHTML += `
    <li>
      <span class="chat__user">${userName}:</span>
      <span class="chat__msg">${userMsg}</span>
    </li>
  `;
});

// show if someone typing
socket.on('typing', function(data) {
  feedback.textContent = data + ' is typing...';
});
