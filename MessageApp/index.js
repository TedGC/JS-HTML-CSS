//come bakc to this part where the instructor talks about hash and how to remove it from 
// the original input from the user? something I don't quite get it at a first go of listening to it

const {hash} = window.location; 

const message = atob(hash.replace('#', ''));

if(message) {
    document.querySelector('#message-form').classList.add('hide')
    document.querySelector('#message-show').classList.remove('hide');

    document.querySelector('h1').innerHTML = message; 
}



document.querySelector('form').addEventListener('submit', event =>{
    event.preventDefault();

    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#link-form').classList.remove('hide')

    cosnt input = document.querySelector('#message-input');

    console.log(input.value);
    const encrypted = btoa(input.value);

    const linkInput = document.querySelector('#link-input')
    linkInput.value = `${window.location}#${encrypted}`
    linkInput.select()
})