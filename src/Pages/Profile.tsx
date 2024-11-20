"use client";

import { useState, useMemo } from "react";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Github, Linkedin, Twitter, Sun, Moon } from "lucide-react";

export default function Profile() {
  const [isDark, setIsDark] = useState(true);

  // Sample data for the chart
  const interviewData = [
    { month: "Jan", count: 5 },
    { month: "Feb", count: 8 },
    { month: "Mar", count: 12 },
    { month: "Apr", count: 15 },
    { month: "May", count: 20 },
    { month: "Jun", count: 25 },
  ];

  // Generate activity data for the year
  const activityData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.map((month) => ({
      month,
      days: Array.from({ length: 7 * 5 }, () => Math.floor(Math.random() * 5)),
    }));
  }, []);

  return (
    <div className={`min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="bg-background text-foreground p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 max-w-6xl mx-auto">
          <Avatar className="w-24 h-24 border-2">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">AI Interview Platform</h1>
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
            <p className="text-muted-foreground">
              Revolutionizing interviews through AI-powered conversations and
              insights
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Total Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,547</div>
              <p className="text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">85%</div>
              <p className="text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8.7/10</div>
              <p className="text-muted-foreground">Based on user feedback</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Grid */}
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Activity Overview</span>
              <span className="text-sm font-normal text-muted-foreground">
                1,066 submissions in the past year
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2">
                {activityData.map((month, monthIndex) => (
                  <div key={monthIndex} className="space-y-1">
                    <div className="grid grid-cols-7 gap-1">
                      {month.days.map((activity, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`w-2 h-2 rounded-sm ${
                            activity === 0
                              ? "bg-muted"
                              : activity === 1
                              ? "bg-primary/20"
                              : activity === 2
                              ? "bg-primary/40"
                              : activity === 3
                              ? "bg-primary/60"
                              : "bg-primary"
                          }`}
                          title={`${activity} submissions`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      {month.month}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Progress Chart */}
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Interview Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={interviewData}>
                  <XAxis dataKey="month" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Interviews */}
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Recent Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Software Engineering",
                  date: "2023-11-08",
                  score: 9.2,
                },
                { title: "Data Science", date: "2023-11-07", score: 8.8 },
                { title: "Product Management", date: "2023-11-06", score: 9.0 },
              ].map((interview, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{interview.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {interview.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{interview.score}/10</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
