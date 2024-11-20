import React, { useEffect } from 'react';

const SpeechToText = ({ onTranscript }) => {
  let recognition; // Declare recognition in the component scope

  useEffect(() => {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false; // Set to true for continuous recognition
    recognition.interimResults = false; // Set to true if you want interim results

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript); // Call the onTranscript prop with the recognized text
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    return () => {
      recognition.stop(); // Clean up on unmount
    };
  }, [onTranscript]);

  const startListening = () => {
    recognition.start(); // Start the speech recognition
  };

  return (
    <button onClick={startListening}>Start Listening</button>
  );
};

export default SpeechToText;
