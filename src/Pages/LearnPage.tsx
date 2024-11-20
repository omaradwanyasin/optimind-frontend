"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar.tsx";
import { ScrollArea } from "../components/ui/scroll-area.tsx";
import {
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Filter,
  X,
  BookOpen,
  Code,
  Link,
} from "lucide-react";
import v1 from "../videos/v1.mp4";
import v2 from "../videos/v2.mp4";
import v3 from "../videos/v3.mp4";

const reels = [
  {
    id: 1,
    title: "Quick Sort Explained",
    author: "AlgoMaster",
    likes: 1200,
    comments: 45,
    videoUrl: v1,
    category: "Algorithms",
    resources: [
      { type: "article", title: "Understanding Quick Sort", url: "#" },
      { type: "code", title: "Quick Sort Implementation", url: "#" },
      { type: "video", title: "Quick Sort Visualization", url: "#" },
    ],
  },
  {
    id: 2,
    title: "React Hooks in 60 Seconds",
    author: "ReactNinja",
    likes: 980,
    comments: 32,
    videoUrl: v2,
    category: "Web Development",
    resources: [
      { type: "article", title: "React Hooks Documentation", url: "#" },
      { type: "code", title: "Hooks Examples", url: "#" },
      { type: "video", title: "Advanced Hooks Tutorial", url: "#" },
    ],
  },
  {
    id: 3,
    title: "Python List Comprehensions",
    author: "PythonPro",
    likes: 1500,
    comments: 60,
    videoUrl: v3,
    category: "Python",
    resources: [
      { type: "article", title: "List Comprehensions Guide", url: "#" },
      { type: "code", title: "List Comprehension Examples", url: "#" },
      { type: "video", title: "Python Performance Optimization", url: "#" },
    ],
  },
];

const topCreators = [
  {
    name: "AlgoMaster",
    avatar: "https://i.pravatar.cc/150?u=AlgoMaster",
    followers: 50000,
  },
  {
    name: "ReactNinja",
    avatar: "https://i.pravatar.cc/150?u=ReactNinja",
    followers: 45000,
  },
  {
    name: "PythonPro",
    avatar: "https://i.pravatar.cc/150?u=PythonPro",
    followers: 48000,
  },
];

const categories = [
  "All",
  "Algorithms",
  "Web Development",
  "Python",
  "Data Structures",
  "Machine Learning",
];

const ReelCard = ({ reel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-6rem)] bg-black flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain"
        src={reel.videoUrl}
        loop
        playsInline
        onClick={togglePlay}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10 ring-2 ring-white">
              <AvatarImage
                src={`https://i.pravatar.cc/150?u=${reel.author}`}
                alt={reel.author}
              />
              <AvatarFallback>{reel.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-white">{reel.author}</p>
              <p className="text-sm text-gray-300">{reel.title}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-black bg-white hover:bg-gray-200 transition-colors"
          >
            Follow
          </Button>
        </div>
      </div>
      <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-4">
        <Button
          variant="ghost"
          className="text-white hover:bg-white hover:text-black transition-colors"
        >
          <Heart className="h-6 w-6" />
        </Button>
        <p className="text-sm text-white">{reel.likes}</p>
        <Button
          variant="ghost"
          className="text-white hover:bg-white hover:text-black transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <p className="text-sm text-white">{reel.comments}</p>
        <Button
          variant="ghost"
          className="text-white hover:bg-white hover:text-black transition-colors"
        >
          <Share2 className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          className="text-white hover:bg-white hover:text-black transition-colors"
          onClick={() => setShowResources(!showResources)}
        >
          <BookOpen className="h-6 w-6" />
        </Button>
      </div>
      {showResources && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4"
        >
          <h3 className="text-white font-bold mb-2">Learning Resources</h3>
          <div className="flex flex-wrap gap-2">
            {reel.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                className="flex items-center bg-white text-black px-2 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {resource.type === "article" && (
                  <BookOpen className="h-4 w-4 mr-1" />
                )}
                {resource.type === "code" && <Code className="h-4 w-4 mr-1" />}
                {resource.type === "video" && <Link className="h-4 w-4 mr-1" />}
                {resource.title}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function TechLearningReelsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredReels =
    selectedCategory === "All"
      ? reels
      : reels.filter((reel) => reel.category === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-black text-white flex">
      <div className="flex-grow overflow-y-auto snap-y snap-mandatory">
        {filteredReels.map((reel) => (
          <div key={reel.id} className="snap-start h-[calc(100vh-6rem)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <ReelCard reel={reel} />
            </motion.div>
          </div>
        ))}
      </div>
      <div className="w-80 bg-black p-6 overflow-y-auto h-[40%]">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            Top Creators
          </h2>
          {topCreators.map((creator, index) => (
            <div
              key={creator.name}
              className="flex items-center space-x-3 mb-4"
            >
              <span className="font-bold text-gray-400">{index + 1}</span>
              <Avatar className="h-10 w-10 ring-2 ring-white">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{creator.name}</p>
                <p className="text-sm text-gray-400">
                  {creator.followers.toLocaleString()} followers
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button
            variant="outline"
            className="w-full mb-4 text-black bg-white hover:bg-gray-200 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? (
              <X className="h-4 w-4 mr-2" />
            ) : (
              <Filter className="h-4 w-4 mr-2" />
            )}
            {showFilters ? "Close Filters" : "Filter Videos"}
          </Button>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollArea className="h-64">
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      className={`justify-center ${
                        selectedCategory === category
                          ? "bg-white text-black hover:bg-gray-200"
                          : "text-white border-white hover:bg-white hover:text-black"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
