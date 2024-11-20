"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Sun, Moon, Play } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const questions = [
  {
    id: 1,
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    example:
      "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    template: {
      javascript: `function twoSum(nums, target) {
  // Your code here
}`,
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], output: [0, 1] },
      { input: [[3, 2, 4], 6], output: [1, 2] },
      { input: [[3, 3], 6], output: [0, 1] },
    ],
  },
  {
    id: 2,
    title: "Palindrome Number",
    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    example:
      "Input: x = 121\nOutput: true\nExplanation: 121 reads as 121 from left to right and from right to left.",
    template: {
      javascript: `function isPalindrome(x) {
  // Your code here
}`,
      python: `def is_palindrome(x):
    # Your code here
    pass`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Your code here
    }
}`,
    },
    testCases: [
      { input: [121], output: true },
      { input: [-121], output: false },
      { input: [10], output: false },
    ],
  },
];

type Player = "player1" | "player2";
type Language = "javascript" | "python" | "java";

export default function Codingpage() {
  const [isDark, setIsDark] = useState(true);
  const [time, setTime] = useState(600); // 10 minutes in seconds
  const [winner, setWinner] = useState<Player | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("player1");
  const [player1Code, setPlayer1Code] = useState(
    questions[0].template.javascript
  );
  const [player2Code, setPlayer2Code] = useState(
    questions[0].template.javascript
  );
  const [player1Lang, setPlayer1Lang] = useState<Language>("javascript");
  const [player2Lang, setPlayer2Lang] = useState<Language>("javascript");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (player: Player) => {
    if (!winner) {
      // In a real implementation, you would run the code against test cases here
      const code = player === "player1" ? player1Code : player2Code;
      const allTestsPassed = runTests(
        code,
        questions[currentQuestionIndex].testCases
      );

      if (allTestsPassed) {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setPlayer1Code(
            questions[currentQuestionIndex + 1].template[player1Lang]
          );
          setPlayer2Code(
            questions[currentQuestionIndex + 1].template[player2Lang]
          );
        } else {
          setWinner(player);
        }
      }
    }
  };

  const runTests = (code: string, testCases: any[]): boolean => {
    // This is a placeholder. In a real implementation, you would actually run the code.
    console.log("Running tests for:", code);
    return true; // Assume all tests pass for this example
  };

  const handleRunCode = () => {
    const code = currentPlayer === "player1" ? player1Code : player2Code;
    // In a real implementation, you would execute the code here
    setOutput(`Output for ${currentPlayer}:\n${code}\n\nExecution successful!`);
  };

  const handleLanguageChange = (value: Language, player: Player) => {
    if (player === "player1") {
      setPlayer1Lang(value);
      setPlayer1Code(questions[currentQuestionIndex].template[value]);
    } else {
      setPlayer2Lang(value);
      setPlayer2Code(questions[currentQuestionIndex].template[value]);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={`min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="bg-background text-foreground p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Advanced Coding Battle</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Timer and Player Info */}
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Time Remaining: {formatTime(time)}</span>
              <span>
                Current Player:{" "}
                {currentPlayer === "player1" ? "Player 1" : "Player 2"}
              </span>
              {winner && <span className="text-primary">Winner: {winner}</span>}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Question */}
          <Card>
            <CardHeader>
              <CardTitle>
                Question {currentQuestionIndex + 1}: {currentQuestion.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{currentQuestion.description}</p>
              <div className="mb-4">
                <h3 className="font-semibold">Example:</h3>
                <SyntaxHighlighter language="typescript" style={tomorrow}>
                  {currentQuestion.example}
                </SyntaxHighlighter>
              </div>
            </CardContent>
          </Card>

          {/* Coding Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg"
                      alt={`Player ${currentPlayer === "player1" ? "1" : "2"}`}
                    />
                    <AvatarFallback>
                      {currentPlayer === "player1" ? "P1" : "P2"}
                    </AvatarFallback>
                  </Avatar>
                  Player {currentPlayer === "player1" ? "1" : "2"}
                </div>
                <Select
                  value={
                    currentPlayer === "player1" ? player1Lang : player2Lang
                  }
                  onValueChange={(value: Language) =>
                    handleLanguageChange(value, currentPlayer)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Editor
                height="300px"
                language={
                  currentPlayer === "player1" ? player1Lang : player2Lang
                }
                theme={isDark ? "vs-dark" : "light"}
                value={currentPlayer === "player1" ? player1Code : player2Code}
                onChange={(value) =>
                  currentPlayer === "player1"
                    ? setPlayer1Code(value || "")
                    : setPlayer2Code(value || "")
                }
              />
              <div className="flex justify-between mt-4">
                <Button onClick={handleRunCode}>
                  <Play className="mr-2 h-4 w-4" /> Run Code
                </Button>
                <Button
                  onClick={() => handleSubmit(currentPlayer)}
                  disabled={!!winner}
                >
                  Submit
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPlayer(
                      currentPlayer === "player1" ? "player2" : "player1"
                    )
                  }
                >
                  Switch Player
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap">
              {output || "Run your code to see the output here."}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
