import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."   //you can write anything here
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (

    <div className="app-main">
  {loading ? (
    <>
      <h2>Generating..Please Wait..</h2>
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </>
  ) : (
    <>
      <h2>AI-Picturey</h2>                            
      <div className="textarea-container">
        <textarea
          className="app-input"
          placeholder={placeholder}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button className="solver-btn">
          <a href="https://your-example-solver.netlify.app.example" target="_blank">⫷solver</a>
        </button>
        <button className="generate-btn" onClick={generateImage}>Generate</button>
      </div>
      {result.length > 0 ? (
        <img className="result-image" src={result} alt="result" />
      ) : (
        <></>
      )}
    </>
  )}
</div>
  )
}

export default App;
