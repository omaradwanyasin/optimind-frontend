'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.tsx"
import { Badge } from "../components/ui/badge.tsx"
import { ScrollArea } from "../components/ui/scroll-area.tsx"
import { Trophy, Code, Star, Calendar, Info } from 'lucide-react'

const ActivityGrid = ({ activities }) => {
  const generateDates = (): Date[] => {
    const dates: Date[] = []
    const today = new Date()
    const startDate = new Date(today)
    startDate.setFullYear(today.getFullYear() - 1)

    while (startDate <= today) {
      dates.push(new Date(startDate))
      startDate.setDate(startDate.getDate() + 1)
    }
    return dates
  }

  const groupDates = (dates: Date[]): { [key: string]: Date[][] } => {
    const months = {}
    dates.forEach(date => {
      const monthKey = date.toLocaleString('default', { month: 'short' })
      if (!months[monthKey]) {
        months[monthKey] = []
      }
      const weekIndex = Math.floor(date.getDate() / 7)
      if (!months[monthKey][weekIndex]) {
        months[monthKey][weekIndex] = []
      }
      months[monthKey][weekIndex].push(date)
    })
    return months
  }

  const dates = generateDates()
  const groupedDates = groupDates(dates)

  const getActivityLevel = (date) => {
    const activity = activities.find(a => 
      new Date(a.date).toDateString() === date.toDateString()
    )
    return activity ? activity.level : 0
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <span>1,066 submissions in the past one year</span>
        <Info className="h-4 w-4" />
        <div className="ml-auto flex items-center gap-2">
          <span>Total active days: 100</span>
          <span>Max streak: 10</span>
        </div>
      </div>
      <div className="flex gap-1">
        {Object.entries(groupedDates).map(([month, weeks]) => (
          <div key={month} className="flex flex-col gap-1">
            <div className="grid grid-rows-7 gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div key={dayIndex} className="flex gap-1">
                  {weeks.map((week: Date[], weekIndex: number) => {
                    const date = week[dayIndex]
                    if (!date) return <div key={weekIndex} className="w-3 h-3" />
                    
                    const level = getActivityLevel(date)
                    const bgColor = level === 0 ? 'bg-gray-800' :
                                    level === 1 ? 'bg-emerald-900' :
                                    level === 2 ? 'bg-emerald-700' :
                                    'bg-emerald-500'
                    
                    return (
                      <div
                        key={weekIndex}
                        className={`w-3 h-3 rounded-sm ${bgColor} transition-colors duration-200 hover:ring-2 hover:ring-emerald-300`}
                        title={`${date.toLocaleDateString()}: ${level} submissions`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-400 mt-1">{month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const UserBadges = ({ badges }) => (
  <div className="flex flex-wrap gap-2">
    {badges.map((badge, index) => (
      <Badge key={index} variant="outline" className="border-gray-600 bg-gray-800 text-white">
        {badge.icon}
        <span className="ml-1">{badge.name}</span>
      </Badge>
    ))}
  </div>
)

const UserPosts = ({ posts }) => (
  <ScrollArea className="h-[300px]">
    {posts.map((post, index) => (
      <Card key={index} className="mb-4 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{post.content}</p>
          <div className="mt-2 text-sm text-gray-400">{post.date}</div>
        </CardContent>
      </Card>
    ))}
  </ScrollArea>
)

const CodeBattleHistory = ({ battles }) => (
  <ScrollArea className="h-[300px]">
    {battles.map((battle, index) => (
      <Card key={index} className="mb-4 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center text-white">
            {battle.won ? <Trophy className="mr-2 text-yellow-500" /> : <Code className="mr-2 text-gray-400" />}
            {battle.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">Rank: {battle.rank}</p>
          <p className="text-gray-300">Score: {battle.score}</p>
          <div className="mt-2 text-sm text-gray-400">{battle.date}</div>
        </CardContent>
      </Card>
    ))}
  </ScrollArea>
)

export default function UserDashboard() {
  const user = {
    name: "Jane Doe",
    username: "janedoe123",
    avatar: "/placeholder.svg?height=100&width=100",
    level: 42,
    interviewCount: 15,
    codeBattleCount: 30,
  }

  const activities = [
    { date: '2024-01-01', level: 2, count: 3 },
    { date: '2024-01-02', level: 1, count: 1 },
    { date: '2024-01-03', level: 3, count: 5 },
    // Add more activities to demonstrate the grid
  ]

  const badges = [
    { name: "5 Code Battles", icon: <Trophy className="h-4 w-4 text-yellow-500" /> },
    { name: "10 Interviews", icon: <Star className="h-4 w-4 text-blue-400" /> },
    { name: "30 Day Streak", icon: <Calendar className="h-4 w-4 text-green-400" /> },
  ]

  const posts = [
    { title: "My First Technical Interview", content: "Today, I had my first technical interview using the AI interviewer. It was challenging but...", date: "2024-01-01" },
    { title: "Code Battle Victory!", content: "Just won my 5th code battle! The Two Sum problem was tricky, but I managed to optimize my solution...", date: "2024-01-03" },
  ]

  const battles = [
    { title: "Two Sum Challenge", won: true, rank: 1, score: 100, date: "2024-01-03" },
    { title: "Binary Tree Traversal", won: false, rank: 5, score: 85, date: "2024-01-02" },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* User Profile Card */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardContent className="flex items-center space-x-4 pt-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-400">@{user.username}</p>
              <div className="mt-2 space-y-1">
                <p className="flex items-center gap-2 text-gray-300">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Level {user.level}
                </p>
                <p className="flex items-center gap-2 text-gray-300">
                  <Code className="h-4 w-4 text-blue-400" />
                  {user.interviewCount} Technical Interviews
                </p>
                <p className="flex items-center gap-2 text-gray-300">
                  <Trophy className="h-4 w-4 text-green-400" />
                  {user.codeBattleCount} Code Battles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-8">
          {/* Activity Grid Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityGrid activities={activities} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Badges Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <UserBadges badges={badges} />
              </CardContent>
            </Card>

            {/* Recent Posts Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <UserPosts posts={posts} />
              </CardContent>
            </Card>

            {/* Code Battle History Card */}
            <Card className="bg-gray-900 border-gray-800 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Code Battle History</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBattleHistory battles={battles} />
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}