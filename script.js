const button = document.querySelector('button');
const text = document.querySelector('.box-text');

const recognition = createRecognition();
let listening = false;

button.addEventListener('click', event => {
    if(!recognition) return;

    listening ? recognition.stop() : recognition.start();
    listening ? button.classList.remove('listening') : button.classList.add('listening');

    button.innerHTML = listening ? 'Gravar' : 'Parar';

})

function createRecognition(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null;

    if(!recognition) {
        text.innerHTML = "Speech Recognition is not found!";
        return null;
    }

    recognition.lang = "pt_BR";

    recognition.onstart = () => listening = true;
    recognition.onend = () => listening = false;
    recognition.onerror = err => console.log('Error :', err);
    recognition.onresult = event => text.innerHTML = event.results[0][0].transcript;

    return recognition;
}