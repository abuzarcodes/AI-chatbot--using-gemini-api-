import { GoogleGenerativeAI } from "@google/generative-ai";
import md from "markdown-it";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);

async function run(ask) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = ask;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
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
    var questions = document.getElementById("question")
    const output = document.getElementById("output")
    const asked = Submitted_Question();
    const answer = await run(asked);
    const response = md().render(answer)
    console.log(response);
    output.innerHTML=response;
    questions.value=" "
  });
