"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import { Progress } from "../components/ui/progress.tsx";
import { Button } from "../components/ui/button.tsx";
import { ScrollArea } from "../components/ui/scroll-area.tsx";
import { Code, ThumbsUp, Target, Cpu, BookOpen, Video } from "lucide-react";

const interviewData = {
  overallScore: 7.5,
  technicalStrengths: [
    "Strong understanding of data structures",
    "Efficient algorithm implementation",
    "Clear explanation of system design concepts",
    "Proficient in problem-solving approaches",
  ],
  areasForImprovement: [
    "Optimizing time complexity in solutions",
    "Handling edge cases in coding problems",
    "Explaining thought process more clearly",
    "Improving knowledge of distributed systems",
  ],
  suggestedTopics: [
    "Advanced algorithms and data structures",
    "System design patterns and scalability",
    "Concurrency and multithreading",
    "Design patterns in object-oriented programming",
  ],
};

export default function TechnicalInterviewAnalysis() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Technical Interview Analysis
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ThumbsUp className="mr-2 h-6 w-6 text-primary" />
                Overall Technical Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <span className="text-5xl font-bold">
                  {interviewData.overallScore}
                </span>
                <span className="text-2xl">/10</span>
              </div>
              <Progress
                value={interviewData.overallScore * 10}
                className="mt-4"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="mr-2 h-6 w-6 text-primary" />
                Interview Playback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                {videoPlaying ? (
                  <video
                    controls
                    className="w-full h-full rounded-md"
                    onEnded={() => setVideoPlaying(false)}
                  >
                    <source
                      src="/path-to-your-technical-interview-video.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Button onClick={() => setVideoPlaying(true)}>
                    Play Technical Interview
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-6 w-6 text-primary" />
                Technical Strengths
              </CardTitle>
              <CardDescription>Areas where you excelled</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <ul className="space-y-4">
                  {interviewData.technicalStrengths.map((strength, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Code className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>{strength}</span>
                    </motion.li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-6 w-6 text-primary" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>
                Focus on these to enhance your technical skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <ul className="space-y-4">
                  {interviewData.areasForImprovement.map((area, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Target className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>{area}</span>
                    </motion.li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-primary" />
                Suggested Technical Topics
              </CardTitle>
              <CardDescription>
                Enhance your technical skills with these resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <ul className="space-y-4">
                  {interviewData.suggestedTopics.map((topic, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <BookOpen className="mr-2 h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>{topic}</span>
                    </motion.li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Button size="lg">Schedule Next Technical Practice Interview</Button>
      </motion.div>
    </div>
  );
}
