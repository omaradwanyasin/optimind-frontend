import React, { useEffect } from "react";

function Eleven() {
  useEffect(() => {
    // Function to load the ElevenLabs script dynamically
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;

      script.onload = () => {
        console.log("ElevenLabs script loaded successfully");
      };

      script.onerror = () => {
        console.error("Error loading the ElevenLabs script");
      };

      document.body.appendChild(script);

      // Clean up the script on component unmount
      return () => {
        document.body.removeChild(script);
      };
    };

    // Check for permission using getUserMedia
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted");
        // Load the script only if microphone access is granted
        loadScript();
        // Close the stream to release the microphone for the widget to use
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((error) => {
        console.error("Error during microphone access:", error);

        if (
          error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
        ) {
          alert(
            "Microphone access is required to use this feature. Please enable permissions in your browser settings."
          );
        } else if (
          error.name === "NotFoundError" ||
          error.name === "DevicesNotFoundError"
        ) {
          alert(
            "No microphone found. Please connect a microphone and try again."
          );
        } else if (
          error.name === "NotReadableError" ||
          error.name === "TrackStartError"
        ) {
          alert(
            "Microphone is being used by another application. Please close other apps using the microphone and try again."
          );
        } else {
          alert(
            "An unexpected error occurred. Please check your device settings and try again."
          );
        }
      });
  }, []);

  // Error handling for device issues within the ElevenLabs widget
  const handleDeviceError = (error) => {
    console.error("Device error:", error);
    alert("Please check your microphone and camera settings.");
  };

  return (
    <div>
      <h2>ElevenLabs Conversational AI</h2>
      {/* Custom web component for ElevenLabs AI */}
      <elevenlabs-convai
        agent-id="Ki6sHHQUgxjZiZE6uKYC"
        onError={handleDeviceError}
      ></elevenlabs-convai>
    </div>
  );
}

export default Eleven;
