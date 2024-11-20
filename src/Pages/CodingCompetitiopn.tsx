"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Sun, Moon, Play } from "lucide-react"
import Editor from "@monaco-editor/react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const questions = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    example: `Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
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
}`
    },
    testCases: [
      { input: [[2,7,11,15], 9], output: [0,1] },
      { input: [[3,2,4], 6], output: [1,2] },
      { input: [[3,3], 6], output: [0,1] },
    ]
  },
  {
    id: 2,
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise. An integer is a palindrome when it reads the same backward as forward.",
    example: `Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.`,
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
}`
    },
    testCases: [
      { input: [121], output: true },
      { input: [-121], output: false },
      { input: [10], output: false },
    ]
  }
]

type Language = 'javascript' | 'python' | 'java'

export default function AdvancedCodingBattle() {
  const [isDark, setIsDark] = useState(true)
  const [time, setTime] = useState(600) // 10 minutes in seconds
  const [code, setCode] = useState(questions[0].template.javascript)
  const [lang, setLang] = useState<Language>('javascript')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [output, setOutput] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    // In a real implementation, you would run the code against test cases here
    const allTestsPassed = runTests(code, questions[currentQuestionIndex].testCases)
    
    if (allTestsPassed) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setCode(questions[currentQuestionIndex + 1].template[lang])
      } else {
        setOutput("Congratulations! You've completed all questions!")
      }
    }
  }

  const runTests = (code: string, testCases: any[]): boolean => {
    // This is a placeholder. In a real implementation, you would actually run the code.
    console.log("Running tests for:", code)
    return true // Assume all tests pass for this example
  }

  const handleRunCode = () => {
    // In a real implementation, you would execute the code here
    setOutput(`Output:\n${code}\n\nExecution successful!`)
  }

  const handleLanguageChange = (value: Language) => {
    setLang(value)
    setCode(questions[currentQuestionIndex].template[value])
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className={`min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="bg-background text-foreground p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Advanced Coding Battle</h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg">Time: {formatTime(time)}</span>
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
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Question */}
          <Card className="col-span-1 overflow-auto">
            <CardHeader>
              <CardTitle>Question {currentQuestionIndex + 1}: {currentQuestion.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{currentQuestion.description}</p>
              <div>
                <h3 className="font-semibold mb-2">Example:</h3>
                <SyntaxHighlighter language="typescript" style={tomorrow}>
                  {currentQuestion.example}
                </SyntaxHighlighter>
              </div>
            </CardContent>
          </Card>

          {/* Coding Area */}
          <Card className="col-span-2 flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center justify-between">
                <span>Coding Area</span>
                <Select
                  value={lang}
                  onValueChange={(value: Language) => handleLanguageChange(value)}
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
            <CardContent className="flex-grow flex flex-col">
              <Editor
                height="100%"
                language={lang}
                theme={isDark ? "vs-dark" : "light"}
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                }}
              />
              <div className="flex justify-between mt-4">
                <Button onClick={handleRunCode}>
                  <Play className="mr-2 h-4 w-4" /> Run Code
                </Button>
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap max-h-40 overflow-auto">
              {output || "Run your code to see the output here."}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}