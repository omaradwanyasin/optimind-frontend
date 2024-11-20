// src/Pages/TestApiResponse.tsx
import React, { useEffect, useState } from "react";

const TestApiResponse: React.FC = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = "AIzaSyAzQVEJ8pcX9CCGTrrOtA7gZyDmVyUamIc"; // Replace with your actual API key

  const fetchAIResponse = async () => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: "Explain how AI works",
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("AI Response:", data);

      if (data.candidates && data.candidates.length > 0) {
        console.log("First Candidate:", data.candidates[0]);

        if (data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
          const aiText = data.candidates[0].content.parts[0].text;
          console.log("Extracted AI Text:", aiText);
          setResponse(aiText);
        } else {
          console.warn("No parts found in the first candidate's content.");
        }
      } else {
        console.warn("No candidates found in the response.");
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAIResponse();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">API Response Test</h1>
      {error && <div className="text-red-500">Error: {error}</div>}
      {response ? (
        <div>
          <h2 className="text-xl font-semibold">Response:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestApiResponse;
