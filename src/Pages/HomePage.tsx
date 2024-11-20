"use client";

import { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Button } from "../components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import { Sun, Moon, ChevronDown, ArrowRight, Play, Users, Code, BarChart } from 'lucide-react';
import img1 from "../videos/coding2.gif";
import v2 from "../videos/coding.mp4";
import adv from "../videos/man22.mp4";
import img2 from "../images/afterinterview.png";
import peerProgramming from "../images/coding1.png";
import coding2 from "../videos/coding2.mp4";

const Step = ({ children, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="mb-16 md:mb-32"
    >
      {children}
    </motion.div>
  );
};

const ParallaxVideo = ({ src }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className="relative w-full h-[50vh] md:h-[90vh] overflow-hidden rounded-xl shadow-2xl"
    >
      <video
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    </motion.div>
  );
};

export default function MainPage() {
  const [isDark, setIsDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const firstModelRef = useRef(null);
  const secondModelRef = useRef(null);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "50%", "100%"]
  );

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateSplineTheme = () => {
      if (firstModelRef.current) {
        firstModelRef.current.setBackgroundColor(
          isDark ? "#000000" : "#ffffff"
        );
      }
      if (secondModelRef.current) {
        secondModelRef.current.setBackgroundColor(
          isDark ? "#000000" : "#ffffff"
        );
      }
    };
    updateSplineTheme();
  }, [isDark]);

  const pricingPlans = [
    {
      name: "Basic",
      description: "Perfect for beginners",
      price: "$9.99/month",
      features: ["5 AI Interviews/month", "Basic feedback", "Email support"],
    },
    {
      name: "Pro",
      description: "For serious job seekers",
      price: "$19.99/month",
      features: [
        "Unlimited AI Interviews",
        "Advanced feedback",
        "Priority support",
        "Interview recording",
      ],
    },
    {
      name: "Enterprise",
      description: "Custom solutions for companies",
      price: "Contact us",
      features: [
        "Custom AI models",
        "Team management",
        "API access",
        "Dedicated account manager",
      ],
    },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="bg-background text-foreground transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold">
              optimind
            </a>
            <div className="flex items-center space-x-4">
              <a
                href="login"
                className="text-sm font-medium hover:text-primary"
              >
                Login
              </a>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* First Section */}
        <motion.section className="min-h-screen flex flex-col justify-center items-center relative">
          <div className="w-full h-[50vh] md:h-[60vh]">
            <Spline
              scene="https://prod.spline.design/UGdvdirg-X7HQyxX/scene.splinecode"
              onLoad={(spline) => {
                firstModelRef.current = spline;
                spline.setBackgroundColor(isDark ? "#000000" : "#ffffff");
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="w-full flex items-center justify-center mt-8">
            <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg w-full max-w-2xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Master Your Interviews with AI
              </h1>
              <p className="text-xl mb-8">
                Practice, improve, and succeed in your job interviews with our
                cutting-edge AI technology.
              </p>
              <Button size="lg" className="text-lg px-8 py-6">
                Start Interview
              </Button>
            </div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.section>

        {/* Enhanced How It Works Section */}
        <section className="relative bg-gradient-to-b from-background to-background/80 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              How It Works
            </motion.h1>

            <Step index={0}>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-primary">
                1. Join the Interview
              </h2>
              <ParallaxVideo src={adv} />
              <p className="text-lg md:text-xl mt-6">
                Begin your journey with our immersive AI-powered interview
                experience. Our cutting-edge technology simulates real-world
                scenarios to prepare you for success.
              </p>
            </Step>

            <Step index={1}>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-primary">
                2. Solve Questions in Your Preferred Language
              </h2>
              <p className="text-lg md:text-xl mb-6">
                Tackle challenging problems with the support of our AI
                assistant. Get hints and guidance, just like in a real
                interview, to showcase your skills effectively.
              </p>
              <ParallaxVideo src={v2} />
            </Step>

            <Step index={2}>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-primary">
                3. Receive Comprehensive Analysis
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    Real-time Insights
                  </h3>
                  <p className="text-base md:text-lg mb-6">
                    After your interview, gain valuable insights with our
                    real-time analysis. Identify strengths, areas for
                    improvement, and strategies to excel in future interviews.
                  </p>
                  <ul className="list-disc list-inside mb-6 space-y-2 text-base md:text-lg">
                    <li>Detailed performance breakdown</li>
                    <li>Personalized improvement suggestions</li>
                    <li>Comparison with industry standards</li>
                    <li>AI-powered feedback on communication skills</li>
                  </ul>
                  <Button variant="secondary" size="lg">
                    View Sample Analysis
                  </Button>
                </div>
                <motion.div
                  className="relative w-full h-[40vh] md:h-[60vh] rounded-xl shadow-2xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <img
                    src={img2}
                    alt="Analysis Dashboard"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </Step>

            <Step index={3}>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-primary">
                4. Practice with Friends and Join Competitions
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    Collaborative Learning
                  </h3>
                  <p className="text-base md:text-lg mb-6">
                    Connect with friends and fellow learners to practice
                    together. Join programming competitions, participate in
                    study groups, and accelerate your growth through
                    peer-to-peer learning.
                  </p>
                  <ul className="list-disc list-inside mb-6 space-y-2 text-base md:text-lg">
                    <li>Form study groups with like-minded individuals</li>
                    <li>Participate in friendly coding competitions</li>
                    <li>Share knowledge and learn from your peers</li>
                    <li>Prepare for technical interviews as a team</li>
                  </ul>
                  <Button variant="secondary" size="lg">
                    Join a Study Group
                  </Button>
                </div>
                <motion.div
                  className="relative w-full h-[40vh] md:h-[60vh] rounded-xl shadow-2xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <img
                    src={peerProgramming}
                    alt="Friends practicing together"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </Step>

            <motion.div
              className="text-center mt-12 md:mt-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary">
                Ready to Transform Your Interview Skills?
              </h2>
              <p className="text-lg md:text-xl mb-6">
                Join thousands of successful candidates who have mastered the
                art of interviewing with our AI-powered platform.
              </p>
              <Button size="lg">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="py-12 md:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "AI-Powered Interviews",
                  description:
                    "Experience realistic interview simulations with our advanced AI technology.",
                },
                {
                  title: "Instant Feedback",
                  description:
                    "Receive immediate, detailed feedback on your performance to identify areas for improvement.",
                },
                {
                  title: "Personalized Learning",
                  description:
                    "Get tailored interview questions and tips based on your industry and experience level.",
                },
                {
                  title: "Progress Tracking",
                  description:
                    "Monitor your improvement over time with detailed analytics and performance metrics.",
                },
                {
                  title: "Interview Recording",
                  description:
                    "Review your interviews with video playback to refine your presentation skills.",
                },
                {
                  title: "Expert Resources",
                  description:
                    "Access a wealth of interview tips, industry insights, and career advice from professionals.",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          id="pricing"
          className="py-12 md:py-20 bg-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Choose Your Plan
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {pricingPlans.map((plan, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl md:text-3xl font-bold mb-4">{plan.price}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Get Started</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer id="contact" className="bg-background py-12 border-t">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">AI Interview</h3>
                <p className="text-sm text-muted-foreground">
                  Empowering job seekers with AI-driven interview preparation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      How it Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 4.5a8.5 8.5 0 01-2.45.67 4.25 4.25 0 001.86-2.34 8.5 8.5 0 01-2.7 1.03 4.24 4.24 0 00-7.23 3.87 12.05 12.05 0 01-8.75-4.44 4.24 4.24 0 001.31 5.66 4.21 4.21 0 01-1.92-.53v.05a4.24 4.24 0 003.4 4.16 4.25 4.25 0 01-1.91.07 4.24 4.24 0 003.96 2.94 8.5 8.5 0 01-5.26 1.81c-.34 0-.68-.02-1.01-.06a12 12 0 006.5 1.9c7.8 0 12.06-6.46 12.06-12.06 0-.18 0-.37-.01-.55a8.6 8.6 0 002.11-2.19z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.2 5.8c-.8.4-1.6.6-2.5.8.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.7 1.1-.8-.9-1.9-1.4-3.2-1.4-2.4 0-4.3 1.9-4.3 4.3 0 .3 0 .7.1 1-3.6-.2-6.8-1.9-8.9-4.5-.4.7-.6 1.4-.6 2.3 0 1.5.8 2.8 1.9 3.6-.7 0-1.4-.2-1.9-.5v.1c0 2.1 1.5 3.8 3.4 4.2-.4.1-.7.2-1.1.2-.3 0-.5 0-.8-.1.5 1.7 2.1 2.9 3.9 3-1.4 1.1-3.2 1.8-5.1 1.8-.3 0-.7 0-1-.1 1.8 1.2 4 1.8 6.3 1.8 7.6 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.4 2H3.6C2.7 2 2 2.7 2 3.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6zM8 19H5V9h3v10zM6.5 7.7c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM19 19h-3v-5.3c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9h2.8v1.3h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V19z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>&copy; 2023 AI Interview. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}