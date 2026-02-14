import apiKey from "./api.js"

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

/*  isko tb us karna jb history chaiye hoga
window.onload = () =>{
  const savedChat = localStorage.getItem("chatHistory");
  console.log({savedChat});
  if(savedChat) chatBox.innerHTML = savedChat;
  chatBox.scrollTop = chatBox.scrollHeight;
}
  */

function addMessage(message , className){
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message",className);
 //message added on screen div as text
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping(){
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message","bot-message");
  typingDiv.textContent = "Bot is typing...";
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typingDiv;
}

async function getBotReply(userMessage){
 const url =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

 try{
  const response = await fetch(url, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      contents: [{parts: [{text: userMessage}]}]
    })
  })
// storing responce in data
  const data = await response.json();
  
  // error aagya to upr aayega
  if(!response.ok){
    console.error("API Error:", data);
    return data?.error?.message || "Error fetching response."
  }
  
  return(
    data.candidates?.[0]?.content?.parts?.[0]?.text || "Repeat that shit again dog."
  )
 } catch(error){
   
 }
 

}


 sendBtn.onclick = async() =>{
  //jo user daalega vo messege mai jayega trim thoda extra space kai liye
  const message = userInput.value.trim();
  if(message === "") return;
  //addMessage function hai aur user message class sai aa rha hai
  addMessage(message,"user-message");
  userInput.value = "";
// it will show that ai is typing like ...
   const typingDiv = showTyping();

   const botReply = await getBotReply(message);
   typingDiv.remove();
   addMessage(botReply,"bot-message");

   // local storage mai save kr rhe taki refresh pai sara ud na jaye
   localStorage.setItem("chatHistory",chatBox.innerHTML);

 }

 // yai use kiye taki jb enter button press kre tb vo send ho jaye
   userInput.addEventListener("keypress",(e) => {
    if(e.key === "Enter")sendBtn.click();
   })