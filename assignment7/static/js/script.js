document.getElementById("chat-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();
    if (!message) return;

    addMessageToChat("user", message);
    userInput.value = "";

    try {
        const response = await fetch("http://127.0.0.1:8080/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message }),
        });

        if (response.ok) {
            const data = await response.json();
            const answer = data.answer;
            addMessageToChat("chatbot", answer);
        } else {
            addMessageToChat("chatbot", "Sorry, I'm having trouble connecting to the server. Please try again later.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        addMessageToChat("chatbot", "Sorry, I'm having trouble connecting to the server. Please try again later.");
    }
});

function addMessageToChat(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message-wrapper", sender);
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    messageWrapper.appendChild(messageElement);
    chatBox.appendChild(messageWrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}
