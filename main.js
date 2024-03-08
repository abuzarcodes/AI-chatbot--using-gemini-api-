import { GoogleGenerativeAI } from "@google/generative-ai";
import md from "markdown-it";

const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);

async function run(ask) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = ask;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

function submitquest(input) {
  var submittedQuestion = input.value;
  return submittedQuestion;
}

function Submitted_Question() {
  var questions = document.getElementById("question");
  if (questions) {
    return submitquest(questions);
  } else {
    console.error("Element with ID 'question' not found.");
  }
}

document
  .getElementById("submitButton")
  .addEventListener("click", async function () {
    var questions = document.getElementById("question");
    const output = document.getElementById("output");
    const aioutput = document.getElementById("aioutput");
    output.innerHTML += `<div id="userPrompt" class= "user ">${questions.value}</div>`;
    const asked = Submitted_Question();
    questions.value = " ";
    const answer = await run(asked);
    const response = md().render(answer);
    output.innerHTML += `<div id="aiResponse" class="AI ">${response}</div>`;
    console.log(answer);
    console.log(output.innerHTML);
  });
