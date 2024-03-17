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
  let submittedQuestion = input.value;
  return submittedQuestion;
}

function Submitted_Question() {
  let questions = document.getElementById("question");
  if (questions) {
    return submitquest(questions);
  } else {
    console.error("Element with ID 'question' not found.");
  }
}

document
  .getElementById("submitButton")
  .addEventListener("click", async function () {
    let questions = document.getElementById("question");
    const output = document.getElementById("output");
    const aioutput = document.getElementById("aioutput");
    const aiwrapper = document.getElementById("aiwrapper");
    const userwrapper = document.getElementById("userwrapper");
    output.innerHTML += `<div class= "user ">${questions.value}</div> <div class ="loader"></div>`;
    const asked = Submitted_Question();
    const loader = document.querySelectorAll(".loader");
    questions.value = " ";
    try {
      const answer = await run(asked);
      const response = md().render(answer);
      loader.forEach(function (loader) {
        loader.style.display = "none";
      });
      output.innerHTML += `<div class="AI ">${response}</div>`;
    } catch (error) {
      console.error("Error fetching the answer:", error);
      loader.forEach(function (loader) {
        loader.style.display = "none";
      });
      output.innerHTML += `<div class="AI ">Error try again</div>`;
    }
  });
