const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-Btn")

let userMessage;
const API_KEY = "";
const inputInitHeight = chatInput.scrollHeight;


const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and classname
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}


generateResponse = (incomingChatLi) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body:JSON.stringify({
            contents:[{
                role:"user",
                parts:[{text:userMessage}]
            }]
        }),    
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        
        messageElement.textContent = data.candidates[0].content.parts[0].text;
        console.log(data.error);
        
    }).catch((error) => {
        messageElement.textContent = "Oops ! Something went wrong.Please try again.";
        
    }).finally(() => chatBox.scrollTo(0,chatBox.scrollHeight));
        
}
    

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    // Append the user's message to the chatbox
    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTo(0,chatBox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatBox.appendChild(incomingChatLi);
        chatBox.scrollTo(0,chatBox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});


sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () =>document.body.classList.remove("show-chatbot"));


    
    


            
        
