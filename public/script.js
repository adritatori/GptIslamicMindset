const apiKey = "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";
const url = `https://api.openai.com/v1/engines/davinci/search`;

const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("input");
const submit = document.getElementById("submit");

submit.addEventListener("click", async () => {
  const question = input.value;
  input.value = "";
  console.log(question);
  const answer = await getAnswer(question);
  addMessage(question);
  addMessage(answer, true);
});

function addMessage(message, bot = false) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.className = bot ? "bot-message" : "user-message";
  chatWindow.appendChild(messageElement);
}

async function getAnswer(question) {
  const data = {
    "prompt": question,
    "max_tokens": 50,
    "temperature": 0.5,
    "n": 1,
    "stop": "\n"
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result);
  const answer = result.choices[0].text;
  console.log(answer);
  return answer;
}