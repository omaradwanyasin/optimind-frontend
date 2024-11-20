"use client";

import { useState } from "react";
import { Button } from "../components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx";
import { ScrollArea } from "../components/ui/scroll-area.tsx";
import { Badge } from "../components/ui/badge.tsx";
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Search,
  Code2,
  Binary,
  Database,
  Network,
  Boxes,
} from "lucide-react";

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  maxMembers: number;
  deadline: string;
  joined: boolean;
  tags: string[];
}

const categories = [
  { name: "All Groups", icon: Boxes },
  { name: "Algorithms", icon: Binary },
  { name: "System Design", icon: Database },
  { name: "Web Development", icon: Code2 },
  { name: "Networks", icon: Network },
];

export default function StudyGroups() {
  const [selectedCategory, setSelectedCategory] = useState("All Groups");
  const [searchQuery, setSearchQuery] = useState("");

  const mockGroups: StudyGroup[] = [
    {
      id: "1",
      name: "Algorithm Masters",
      description: "Deep dive into advanced algorithmic problems and solutions",
      category: "Algorithms",
      members: 8,
      maxMembers: 10,
      deadline: "2024-02-01",
      joined: true,
      tags: ["DSA", "Competition Prep", "Advanced"],
    },
    {
      id: "2",
      name: "System Design Workshop",
      description: "Learn how to design large-scale distributed systems",
      category: "System Design",
      members: 12,
      maxMembers: 15,
      deadline: "2024-02-15",
      joined: true,
      tags: ["Architecture", "Scalability", "Intermediate"],
    },
    // Add more mock groups as needed
  ];

  const allGroups: StudyGroup[] = [
    ...mockGroups,
    {
      id: "3",
      name: "Frontend Masters",
      description: "Master modern frontend frameworks and best practices",
      category: "Web Development",
      members: 5,
      maxMembers: 8,
      deadline: "2024-02-10",
      joined: false,
      tags: ["React", "Next.js", "Beginner Friendly"],
    },
    {
      id: "4",
      name: "Network Programming",
      description: "Explore network protocols and socket programming",
      category: "Networks",
      members: 6,
      maxMembers: 10,
      deadline: "2024-02-20",
      joined: false,
      tags: ["TCP/IP", "Protocols", "Intermediate"],
    },
    // Add more mock groups as needed
  ];

  const filteredGroups = allGroups.filter((group) => {
    const matchesCategory =
      selectedCategory === "All Groups" || group.category === selectedCategory;
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const joinedGroups = filteredGroups.filter((group) => group.joined);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar - Joined Groups */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Joined Groups</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {joinedGroups.map((group) => (
              <Card key={group.id} className="cursor-pointer hover:bg-muted/50">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">{group.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {group.category}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Study Group</DialogTitle>
                  <DialogDescription>
                    Set up a new study group for collaborative learning
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Group Name</Label>
                    <Input id="name" placeholder="Enter group name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Describe your group" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input id="deadline" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="maxMembers">Maximum Members</Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      min="2"
                      max="20"
                      defaultValue="10"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Group</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Category Filters */}
          <div className="flex gap-2 pb-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                className="flex items-center gap-2"
                onClick={() => setSelectedCategory(category.name)}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>

          {/* Groups Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups
              .filter((group) => !group.joined)
              .map((group) => (
                <Card key={group.id} className="hover:bg-muted/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{group.name}</CardTitle>
                        <CardDescription>{group.category}</CardDescription>
                      </div>
                      <Badge variant="outline">
                        {group.members}/{group.maxMembers} Members
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {group.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      Deadline: {new Date(group.deadline).toLocaleDateString()}
                    </div>
                    <Button>Join Group</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
