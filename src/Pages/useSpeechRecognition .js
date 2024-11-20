import { useRef, useEffect, useState } from "react";

const useSpeechRecognition = () => {
  const [userSpeech, setUserSpeech] = useState("");
  const [isRecognizing, setIsRecognizing] = useState(false); // Track recognition state
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setUserSpeech(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsRecognizing(false); // Mark recognition as stopped
        // Optionally restart if you need continuous listening
        if (recognitionRef.current && !isRecognizing) {
          recognitionRef.current.start();
          setIsRecognizing(true); // Mark as started
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsRecognizing(false);
      };

      // Start recognition once
      if (!isRecognizing) {
        recognitionRef.current.start();
        setIsRecognizing(true);
      }

      // Clean up on unmount
      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }
        setIsRecognizing(false);
      };
    } else {
      console.warn("SpeechRecognition is not supported by this browser.");
    }
  }, [isRecognizing]); // Dependency on recognition state to avoid duplicate starts

  return userSpeech;
};

export default useSpeechRecognition;
