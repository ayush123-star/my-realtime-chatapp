const socket = io('https://ayush-chat-backend.onrender.com');

const form = document.getElementById('send-container')
const messageinput = document.getElementById('messageimp')
const messagecontainer = document.querySelector(".container")
var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageelement = document.createElement('div')
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    scrolltobottom();
    if(position =='left'){
        try{
            audio.play();
        }catch(error){
            console.log("audio playback was blocked until user interaction.");
        }
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value = ''
})

const name = prompt("ENTER YOUR NAME");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'left')
})

socket.on('recive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'left')
})

function scrolltobottom(){
    messagecontainer.scrollTop = messagecontainer.scrollHeight;
}