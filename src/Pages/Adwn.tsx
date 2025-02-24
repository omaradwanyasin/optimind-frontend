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

export default function ADWN() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showCoding, setShowCoding] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [testCases, setTestCases] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const dragControls = useDragControls();

  const toggleMic = async () => {
    if (isMicOn) {
      streamRef.current?.getAudioTracks().forEach((track) => track.stop());
      setIsMicOn(false);
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
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
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
    console.log("Call ended");
  };

  const toggleCoding = () => {
    setShowCoding(!showCoding);
  };

  const runCode = () => {
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
  };

  const codingQuestion = {
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
  };

  useEffect(() => {
    toggleCamera();
  }, []);

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

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {!showCoding ? (
            <motion.div
              key="interview"
              className="flex-grow flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <main className="flex-grow relative overflow-hidden">
                <div className="absolute inset-0">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    style={{ transform: "scaleX(-1)" }}
                  />
                </div>
                {!isCameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <CameraOff className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <AIWindow className="absolute top-4 right-4 w-64 h-48" />
              </main>
              <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <div className="flex space-x-2">
                    <Button
                      variant={isMicOn ? "default" : "secondary"}
                      size="icon"
                      onClick={toggleMic}
                      aria-label={
                        isMicOn ? "Mute microphone" : "Unmute microphone"
                      }
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
                      aria-label={
                        isCameraOn ? "Turn off camera" : "Turn on camera"
                      }
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
                      aria-label="End call"
                    >
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleCoding}
                      aria-label="Show coding challenge"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      aria-label={
                        isDarkMode
                          ? "Switch to light mode"
                          : "Switch to dark mode"
                      }
                    >
                      {isDarkMode ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="coding"
              className="flex-grow flex flex-col overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-grow flex">
                <div className="w-1/2 p-4 overflow-auto border-r">
                  <h2 className="text-2xl font-bold mb-2">
                    {codingQuestion.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Difficulty: {codingQuestion.difficulty}
                  </p>
                  <p className="mb-4">{codingQuestion.description}</p>
                  <h3 className="text-lg font-semibold mb-2">Examples:</h3>
                  {codingQuestion.examples.map((example, index) => (
                    <div key={index} className="mb-4 p-4 bg-muted rounded-lg">
                      <p>
                        <strong>Input:</strong> {example.input}
                      </p>
                      <p>
                        <strong>Output:</strong> {example.output}
                      </p>
                      <p>
                        <strong>Explanation:</strong> {example.explanation}
                      </p>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {codingQuestion.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
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
                      <Button onClick={runCode} disabled={isRunning}>
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

                  <div className="h-1/4 bg-muted p-4 overflow-auto">
                    <h3 className="font-semibold mb-2">Output:</h3>
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  </div>
                  <Button
                    variant="outline"
                    onClick={toggleCoding}
                    className="absolute bottom-4 left-4"
                  >
                    Back to Interview
                  </Button>
                </div>
              </div>
              <AIWindow className="absolute top-4 right-4 w-48 h-36" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
