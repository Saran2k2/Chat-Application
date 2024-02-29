const socket = io()

const clientstotal = document.getElementById('clients-total')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageform = document.getElementById('message-form')
const messageinput = document.getElementById('message-input')

messageform.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})
socket.on('clients-total', (data) =>{
    clientstotal.innerText = `Total clients: ${data}`
})

function sendMessage()
{
if(messageinput.value === '') return
console.log(messageinput.value)
const data = {
    name:nameInput.value,
    message:messageinput.value,
    datetime:new Date(),
}
socket.emit('message',data)
addMessageToUI(true, data)
messageinput.value = ''
messageinput.focus()
}

socket.on('chat-message', (data) => {
console.log(data)
addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) 
{
clearfeedback()
const element = 
`
<li class ="${isOwnMessage ? "message-right" : "message-left"}">
<p class="message">
${data.message}
<span>${data.name} • ${moment(data.datetime).fromNow()}</span>
</p>
</li>
`
messageContainer.innerHTML += element
scrolltobottom()  
}
function scrolltobottom(){
    messageContainer.scrollTo(0,messageContainer.scrollHeight)
}

messageinput.addEventListener('focus', (e) => {
    socket.emit('feedback',
    {
        feedback:`${nameInput.value} is  typing a message`
    })
})
messageinput.addEventListener('keypress', (e) => {
    socket.emit('feedback',{
        feedback:`${nameInput.value} is  typing a message`
    })
})
messageinput.addEventListener('blur', (e) => {
    clearfeedback()
    socket.emit('feedback',
    {
        feedback:``
    })
})
socket.on('feedback', (data) => {
    clearfeedback()
    const element =`
    <li class="message-feedback">
    <p class="feedback" id="feedback">${data.feedback}</p>
    </li>`
    messageContainer.innerHTML += element
})

function clearfeedback() {
    document.querySelectorAll('li.message-feedback').forEach(element =>{
        element.parentNode.removeChild(element)
    })
}
