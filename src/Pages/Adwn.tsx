"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import {
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneOff,
  Code,
  Play,
  RefreshCw,
  Sun,
  Moon,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import Spline from "@splinetool/react-spline";

const GEMINI_API_KEY = "AIzaSyAzQVEJ8pcX9CCGTrrOtA7gZyDmVyUamIc";

export default function AIInterview() {
  const [stage, setStage] = useState("setup");
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isListening, setIsListening] = useState(false);

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const dragControls = useDragControls();

  // Effect to handle camera stream persistence between stages
  useEffect(() => {
    if (isCameraOn && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [stage, isCameraOn]);

  const generateGeminiResponse = async (prompt) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const synthesizeSpeech = (text) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);

    // Wait a brief moment to ensure audio context is ready
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 500);
  };

  const startInterview = async () => {
    try {
      // First set the stage
      setStage("interview");

      // Then generate and speak the welcome message
      const initialPrompt =
        "You are an AI interviewer conducting a job interview for a software developer position. Give a warm, brief welcome and introduction of yourself as the AI interviewer, then ask the candidate to introduce themselves. Keep it natural and friendly.";

      const aiResponse = await generateGeminiResponse(initialPrompt);
      setCurrentQuestion(aiResponse);

      // Ensure speech synthesis happens after stage transition
      setTimeout(() => {
        synthesizeSpeech(aiResponse);
      }, 1000);
    } catch (error) {
      console.error("Error starting interview:", error);
    }
  };

  const processNextQuestion = async (userResponse) => {
    setIsAiSpeaking(true);

    try {
      const prompt = `Previous question: ${currentQuestion}
      
      Candidate's response: ${userResponse}
      
      Based on this, provide the next interview question or comment. Keep the interview professional and relevant to a software developer position.`;

      const aiResponse = await generateGeminiResponse(prompt);
      setCurrentQuestion(aiResponse);
      synthesizeSpeech(aiResponse);
    } catch (error) {
      console.error("Error processing next question:", error);
    }
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = async (event) => {
      const last = event.results.length - 1;
      const response = event.results[last][0].transcript;

      if (event.results[last].isFinal) {
        await processNextQuestion(response);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
    window.speechRecognition = recognition;
  };

  const toggleMic = async () => {
    if (isMicOn) {
      streamRef.current?.getAudioTracks().forEach((track) => track.stop());
      setIsMicOn(false);
      setIsListening(false);
      if (window.speechRecognition) {
        window.speechRecognition.stop();
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;
        setIsMicOn(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      streamRef.current?.getVideoTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current
            .play()
            .catch((e) => console.error("Error playing video:", e));
        }
        setIsCameraOn(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  const hangUp = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsMicOn(false);
    setIsCameraOn(false);
    setStage("setup");
    window.speechSynthesis.cancel();
    if (window.speechRecognition) {
      window.speechRecognition.stop();
    }
  };

  const AIWindow = ({ className = "" }) => (
    <motion.div
      className={`bg-background rounded-lg overflow-hidden shadow-lg z-10 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      drag
      dragControls={dragControls}
      dragMomentum={false}
    >
      <div className="w-full h-full relative">
        <Spline
          scene="https://prod.spline.design/UGdvdirg-X7HQyxX/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
        {isAiSpeaking && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );

  const SetupStage = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Setup Your Devices</h1>
      <div className="flex space-x-4 mb-4">
        <Button onClick={toggleMic}>
          {isMicOn ? <Mic /> : <MicOff />}
          {isMicOn ? "Microphone On" : "Turn On Microphone"}
        </Button>
        <Button onClick={toggleCamera}>
          {isCameraOn ? <Camera /> : <CameraOff />}
          {isCameraOn ? "Camera On" : "Turn On Camera"}
        </Button>
      </div>
      {isCameraOn && (
        <video
          ref={videoRef}
          className="w-64 h-48 bg-gray-200 mb-4 rounded-lg"
          autoPlay
          playsInline
        />
      )}
      <Button
        onClick={() => {
          if (isMicOn && isCameraOn) {
            startInterview();
          } else {
            alert(
              "Please enable both microphone and camera before starting the interview."
            );
          }
        }}
        className="mt-4"
      >
        Start Interview
      </Button>
    </div>
  );

  const InterviewStage = () => (
    <div className="flex flex-col h-full">
      <div className="flex-grow relative overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
        />
        <AIWindow className="absolute top-4 right-4 w-64 h-48" />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={() => {
              if (!isListening) {
                startSpeechRecognition();
              } else {
                if (window.speechRecognition) {
                  window.speechRecognition.stop();
                }
                setIsListening(false);
              }
            }}
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm"
          >
            {isListening ? "Stop Listening" : "Start Answering"}
          </Button>
        </div>
      </div>
    </div>
  );

  const CodingStage = () => (
    <div className="flex-grow flex flex-col overflow-auto">
      <div className="flex-grow flex">
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center justify-between p-2 bg-muted">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  setIsRunning(true);
                  setOutput("Running code...");
                  setTimeout(() => {
                    try {
                      const result = new Function(code)();
                      setOutput(String(result));
                    } catch (error) {
                      setOutput(String(error));
                    }
                    setIsRunning(false);
                  }, 1000);
                }}
                disabled={isRunning}
              >
                {isRunning ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isRunning ? "Running..." : "Run Code"}
              </Button>
              <Button variant="outline" onClick={() => setCode("")}>
                Reset
              </Button>
            </div>
          </div>
          <div className="flex-grow">
            <Editor
              height="50vh"
              defaultLanguage="javascript"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={isDarkMode ? "vs-dark" : "light"}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
        </div>
        <div className="w-1/2 p-4 overflow-auto border-l">
          <h3 className="text-lg font-semibold mb-2">Output:</h3>
          <pre className="whitespace-pre-wrap bg-muted p-4 rounded">
            {output}
          </pre>
        </div>
      </div>
      <AIWindow className="absolute top-4 right-4 w-48 h-36" />
    </div>
  );

  useEffect(() => {
    return () => {
      // Cleanup function
      if (window.speechRecognition) {
        window.speechRecognition.stop();
      }
      window.speechSynthesis.cancel();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {stage === "setup" && (
            <motion.div
              key="setup"
              className="flex-grow flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SetupStage />
            </motion.div>
          )}
          {stage === "interview" && (
            <motion.div
              key="interview"
              className="flex-grow flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <InterviewStage />
            </motion.div>
          )}
          {stage === "coding" && (
            <motion.div
              key="coding"
              className="flex-grow flex flex-col overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CodingStage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <footer className="bg-background p-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant={isMicOn ? "default" : "secondary"}
            size="icon"
            onClick={toggleMic}
            aria-label={isMicOn ? "Mute microphone" : "Unmute microphone"}
          >
            {isMicOn ? (
              <Mic className="h-4 w-4" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant={isCameraOn ? "default" : "secondary"}
            size="icon"
            onClick={toggleCamera}
            aria-label={isCameraOn ? "Turn off camera" : "Turn on camera"}
          >
            {isCameraOn ? (
              <Camera className="h-4 w-4" />
            ) : (
              <CameraOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={hangUp}
            aria-label="End interview"
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        {stage === "interview" && (
          <Button variant="outline" onClick={() => setStage("coding")}>
            Switch to Coding
          </Button>
        )}
        {stage === "coding" && (
          <Button variant="outline" onClick={() => setStage("interview")}>
            Back to Interview
          </Button>
        )}
      </footer>
    </div>
  );
}
