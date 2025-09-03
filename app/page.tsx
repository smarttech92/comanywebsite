"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Code,
  Smartphone,
  TrendingUp,
  Users,
  Star,
  Play,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Sun,
  Moon,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [faqOpenStates, setFaqOpenStates] = useState({})

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark", !isDarkMode)
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  const scrollToSection = (sectionId: string) => {
    console.log(`[v0] Attempting to scroll to section: ${sectionId}`)
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      console.log(`Scrolling to position: ${offsetPosition}`)

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      setActiveSection(sectionId)
    } else {
      console.log(`Section with ID "${sectionId}" not found`)
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["services", "portfolio", "work", "about", "faq", "contact"]
      const scrollPosition = window.scrollY + 150

      if (scrollPosition < 300) {
        setActiveSection("home")
        return
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const elementTop = top + window.pageYOffset
          const elementBottom = bottom + window.pageYOffset

          if (scrollPosition >= elementTop - 200 && scrollPosition < elementBottom - 200) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your interest! We'll get back to you within 24 hours.")
    setIsContactOpen(false)
  }

  const getNavButtonClass = (sectionId: string) => {
    const baseClass = "transition-colors duration-200"
    const activeClass = "text-blue-400 font-semibold"
    const inactiveClass = "text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white"

    return `${baseClass} ${activeSection === sectionId ? activeClass : inactiveClass}`
  }

  const toggleFaqOpen = (index: number) => {
    setFaqOpenStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }))
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
            <img
  src="smart.jpeg"
  alt="Smart Tech Solution Logo"
  className="w-8 h-8 rounded-lg object-contain"
/>
              <span className="text-xl font-bold">Smart Tech Solution</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("services")} className={getNavButtonClass("services")}>
                Services
              </button>
              <button onClick={() => scrollToSection("portfolio")} className={getNavButtonClass("portfolio")}>
                Portfolio
              </button>
              <button onClick={() => scrollToSection("work")} className={getNavButtonClass("work")}>
                Work
              </button>
              <button onClick={() => scrollToSection("about")} className={getNavButtonClass("about")}>
                About
              </button>
              <button onClick={() => scrollToSection("faq")} className={getNavButtonClass("faq")}>
                FAQ
              </button>
              <button onClick={() => scrollToSection("contact")} className={getNavButtonClass("contact")}>
                Contact
              </button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get a Quote</Button>
                </DialogTrigger>
                <DialogContent
                  className={`border transition-colors ${
                    isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"
                  }`}
                >
                  <DialogHeader>
                    <DialogTitle>Get Your Free Quote</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <Input
                      placeholder="Your Name"
                      className={`transition-colors ${
                        isDarkMode ? "bg-slate-800 border-slate-600" : "bg-slate-50 border-slate-300"
                      }`}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className={`transition-colors ${
                        isDarkMode ? "bg-slate-800 border-slate-600" : "bg-slate-50 border-slate-300"
                      }`}
                      required
                    />
                    <Input
                      placeholder="Company Name"
                      className={`transition-colors ${
                        isDarkMode ? "bg-slate-800 border-slate-600" : "bg-slate-50 border-slate-300"
                      }`}
                    />
                    <Textarea
                      placeholder="Tell us about your project..."
                      className={`transition-colors ${
                        isDarkMode ? "bg-slate-800 border-slate-600" : "bg-slate-50 border-slate-300"
                      }`}
                      required
                    />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Send Quote Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={isDarkMode ? "text-white" : "text-slate-900"}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              className={`md:hidden border-t transition-colors ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="px-4 py-4 space-y-4">
                <button
                  onClick={() => scrollToSection("services")}
                  className={`block ${getNavButtonClass("services")}`}
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className={`block ${getNavButtonClass("portfolio")}`}
                >
                  Portfolio
                </button>
                <button onClick={() => scrollToSection("work")} className={`block ${getNavButtonClass("work")}`}>
                  Work
                </button>
                <button onClick={() => scrollToSection("about")} className={`block ${getNavButtonClass("about")}`}>
                  About
                </button>
                <button onClick={() => scrollToSection("faq")} className={`block ${getNavButtonClass("faq")}`}>
                  FAQ
                </button>
                <button onClick={() => scrollToSection("contact")} className={`block ${getNavButtonClass("contact")}`}>
                  Contact
                </button>
                <Button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden" id="home">
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/20"
              : "bg-gradient-to-br from-slate-50 via-white to-blue-50/50"
          }`}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
              Build, Grow, and{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Dominate</span>{" "}
              with Smart Tech Solution
            </h1>
            <p
              className={`text-xl md:text-2xl text-balance mb-8 max-w-4xl mx-auto transition-colors ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              We engineer cutting-edge websites, mobile apps, and data-driven marketing strategies that propel your
              business into the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all"
                onClick={() => setIsContactOpen(true)}
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`px-8 py-4 text-lg transform hover:scale-105 transition-all ${
                  isDarkMode
                    ? "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                }`}
                onClick={() => scrollToSection("work")}
              >
                View Our Case Studies →
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section
        id="services"
        className={`py-24 transition-colors duration-300 ${isDarkMode ? "bg-slate-900/50" : "bg-slate-50/50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p
              className={`text-xl max-w-3xl mx-auto transition-colors ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Where strategic vision meets technical brilliance. We don't just build products; we build integrated
              digital ecosystems designed for growth and scalability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                color: "blue",
                title: "Website Development",
                description:
                  "Pixel-perfect, responsive websites built for speed, SEO, and conversion. Your digital flagship, engineered to impress.",
              },
              {
                icon: Smartphone,
                color: "purple",
                title: "Mobile App Development",
                description:
                  "Native and cross-platform apps that deliver flawless user experiences and drive engagement on every device.",
              },
              {
                icon: TrendingUp,
                color: "green",
                title: "Digital Marketing",
                description:
                  "Data-powered strategies for SEO, PPC, and content that attract your ideal audience and generate qualified leads.",
              },
              {
                icon: Users,
                color: "cyan",
                title: "Social Media Management",
                description:
                  "We craft your brand's story, build authentic communities, and manage campaigns that turn followers into customers.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`border transition-all duration-300 group cursor-pointer transform hover:scale-105 ${
                  isDarkMode
                    ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                    : "bg-white/50 border-slate-200 hover:bg-white hover:shadow-lg"
                }`}
              >
                <CardContent className="p-8" onClick={() => setIsContactOpen(true)}>
                  <div
                    className={`w-12 h-12 bg-${service.color}-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className={`mb-6 transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    {service.description}
                  </p>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0">
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className={`py-24 transition-colors duration-300 ${isDarkMode ? "bg-slate-900/50" : "bg-slate-50/50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Portfolio</h2>
            <p
              className={`text-xl max-w-3xl mx-auto transition-colors ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Explore our latest projects and see how we've helped businesses transform their digital presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "FinTech Dashboard",
                category: "Web Application",
                description: "A comprehensive financial dashboard with real-time analytics and trading capabilities.",
                image: "/modern-fintech-dashboard.png",
                tech: ["React", "Node.js", "PostgreSQL"],
                metrics: { users: "50K+", growth: "+240%" },
              },
              {
                title: "E-Commerce Mobile App",
                category: "Mobile Development",
                description: "Cross-platform shopping app with AI-powered recommendations and seamless checkout.",
                image: "/modern-mobile-ecommerce-app-interface.png",
                tech: ["React Native", "Firebase", "Stripe"],
                metrics: { downloads: "100K+", rating: "4.8★" },
              },
              {
                title: "Healthcare Platform",
                category: "Full-Stack Solution",
                description: "HIPAA-compliant telemedicine platform connecting patients with healthcare providers.",
                image: "/clean-healthcare-telemedicine-platform.jpg",
                tech: ["Next.js", "AWS", "MongoDB"],
                metrics: { providers: "500+", consultations: "10K+" },
              },
              {
                title: "SaaS Analytics Tool",
                category: "Data Visualization",
                description: "Advanced analytics platform with custom reporting and business intelligence features.",
                image: "/modern-analytics-dashboard.png",
                tech: ["Vue.js", "Python", "Redis"],
                metrics: { companies: "200+", data: "1TB+" },
              },
              {
                title: "Real Estate Platform",
                category: "Web Development",
                description: "Property management system with virtual tours and automated valuation models.",
                image: "/modern-real-estate-platform.png",
                tech: ["Angular", "Django", "MySQL"],
                metrics: { properties: "5K+", agents: "300+" },
              },
              {
                title: "EdTech Learning App",
                category: "Mobile & Web",
                description: "Interactive learning platform with gamification and progress tracking for students.",
                image: "/colorful-educational-learning-app-interface.jpg",
                tech: ["Flutter", "Laravel", "SQLite"],
                metrics: { students: "25K+", courses: "500+" },
              },
            ].map((project, index) => (
              <Card
                key={index}
                className={`border transition-all duration-300 group cursor-pointer overflow-hidden ${
                  isDarkMode
                    ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                    : "bg-white/50 border-slate-200 hover:bg-white hover:shadow-xl"
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">{project.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className={`mb-4 text-sm transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className={`text-xs transition-colors ${
                          isDarkMode ? "border-slate-600 text-slate-300" : "border-slate-300 text-slate-600"
                        }`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                      <div key={metricIndex} className="text-center">
                        <div className="text-lg font-bold text-blue-400">{value}</div>
                        <div
                          className={`text-xs capitalize transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                        >
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                    onClick={() => setIsContactOpen(true)}
                  >
                    View Case Study →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => setIsContactOpen(true)}
            >
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className={`text-xl transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              A proven methodology that delivers results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discover",
                description: "We dive deep into your business goals, target audience, and competitive landscape.",
              },
              {
                step: "02",
                title: "Strategize",
                description: "We craft a comprehensive roadmap tailored to your unique objectives and market position.",
              },
              {
                step: "03",
                title: "Execute",
                description:
                  "Our expert team brings your vision to life with precision, creativity, and technical excellence.",
              },
              {
                step: "04",
                title: "Scale",
                description:
                  "We optimize, iterate, and scale your solution for sustained growth and market leadership.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className={`transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section
        id="work"
        className={`py-24 transition-colors duration-300 ${isDarkMode ? "bg-slate-900/50" : "bg-slate-50/50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-600 text-white mb-4">Featured Case Study</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Transformed TechStartup's Digital Presence</h2>
              <p className={`text-xl mb-8 transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                A complete digital transformation that resulted in unprecedented growth and market positioning for an
                emerging fintech company.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">+240%</div>
                  <div className={`text-sm transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    User Engagement
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">+180%</div>
                  <div className={`text-sm transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Lead Growth
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">+95%</div>
                  <div className={`text-sm transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Conversion Rate
                  </div>
                </div>
              </div>

              <Button
                className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all"
                onClick={() => setIsContactOpen(true)}
              >
                View Full Case Study
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="relative">
              <div
                className={`rounded-2xl p-8 border transition-colors ${
                  isDarkMode
                    ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
                    : "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300"
                }`}
              >
                <div className={`rounded-lg p-6 mb-6 transition-colors ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div
                      className={`h-4 rounded w-3/4 transition-colors ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}
                    ></div>
                    <div
                      className={`h-4 rounded w-1/2 transition-colors ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}
                    ></div>
                    <div className="h-4 bg-blue-600 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => {
                      setIsVideoPlaying(true)
                      alert("Video demo would play here. Contact us to see the full case study!")
                    }}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-all"
                  >
                    <Play className="w-6 h-6 text-white ml-1" />
                  </button>
                  <p className={`transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Watch the transformation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className={`text-xl transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Trusted by leaders across industries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Smart Tech Solution transformed our entire digital strategy. The results speak for themselves - 300% increase in qualified leads within 6 months.",
                author: "Sarah Chen",
                role: "CEO, InnovateLab",
                rating: 5,
              },
              {
                quote:
                  "Their technical expertise and strategic thinking are unmatched. They don't just build products, they build competitive advantages.",
                author: "Michael Rodriguez",
                role: "CTO, TechCorp",
                rating: 5,
              },
              {
                quote:
                  "Working with Smart Tech Solution was a game-changer. They delivered beyond our expectations and continue to drive our growth.",
                author: "Emily Johnson",
                role: "Founder, FutureScale",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`border transition-colors ${
                  isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-200"
                }`}
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className={`mb-6 italic transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className={`text-sm transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className={`text-xl transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Get answers to common questions about our services and process
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does it typically take to complete a project?",
                answer:
                  "Project timelines vary based on complexity and scope. A simple website typically takes 4-6 weeks, while complex web applications can take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.",
              },
              {
                question: "Do you provide ongoing support and maintenance?",
                answer:
                  "Yes, we offer comprehensive support and maintenance packages. This includes regular updates, security patches, performance optimization, and technical support. We believe in long-term partnerships and are committed to your continued success.",
              },
              {
                question: "What technologies do you specialize in?",
                answer:
                  "We specialize in modern web technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS and Vercel. For mobile development, we use React Native and Flutter. We stay current with the latest technologies to deliver cutting-edge solutions.",
              },
              {
                question: "Can you work with our existing team and systems?",
                answer:
                  "We're experienced in collaborating with in-house teams and integrating with existing systems. We can work as an extension of your team, provide consultation, or take full ownership of specific projects based on your needs.",
              },
              {
                question: "What is your pricing structure?",
                answer:
                  "Our pricing is project-based and depends on scope, complexity, and timeline. We provide transparent, detailed quotes with no hidden fees. We also offer flexible payment schedules and can work within various budget ranges. Contact us for a free consultation and quote.",
              },
              {
                question: "Do you help with digital marketing and SEO?",
                answer:
                  "Yes, we provide comprehensive digital marketing services including SEO optimization, content strategy, social media management, and paid advertising campaigns. We take a holistic approach to ensure your digital presence drives real business results.",
              },
              {
                question: "How do you ensure project quality and meet deadlines?",
                answer:
                  "We follow agile development methodologies with regular check-ins, milestone reviews, and continuous testing. Our project managers provide weekly updates, and we use collaborative tools to keep you involved throughout the process. Quality assurance is built into every stage of development.",
              },
              {
                question: "Can you help migrate our existing website or application?",
                answer:
                  "Yes, we specialize in migrations and modernization projects. Whether you're moving to a new platform, upgrading technology, or improving performance, we ensure a smooth transition with minimal downtime and data integrity.",
              },
            ].map((faq, index) => {
              const isOpen = faqOpenStates[index] || false

              return (
                <Card
                  key={index}
                  className={`border transition-colors ${
                    isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-200"
                  }`}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaqOpen(index)}
                      className={`w-full p-6 text-left flex justify-between items-center transition-colors ${
                        isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-50"
                      }`}
                    >
                      <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                      <div className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <p className={`transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <p className={`mb-6 transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Still have questions? We're here to help!
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => setIsContactOpen(true)}
            >
              Contact Our Team
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="about"
        className={`py-24 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20"
            : "bg-gradient-to-br from-blue-50/50 to-purple-50/50"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Have a Vision? We Have the Solution.</h2>
          <p className={`text-xl mb-8 transition-colors ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            Ready to transform your business with cutting-edge technology? Let's discuss how we can accelerate your
            growth.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg transform hover:scale-105 transition-all"
            onClick={() => setIsContactOpen(true)}
          >
            Schedule a Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className={`border-t py-12 transition-colors duration-300 ${
          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
              <img
  src="smart.jpeg"
  alt="Smart Tech Solution Logo"
  className="w-8 h-8 rounded-lg object-contain"
/>
                <span className="text-xl font-bold">Smart Tech Solution</span>
              </div>
              <p className={`mb-4 transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Engineering Digital Excellence
              </p>
              <p className={`text-sm transition-colors ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                Intelligent Solutions, Measurable Results.
              </p>

              <div className="mt-6 space-y-2">
                <div
                  className={`flex items-center space-x-2 transition-colors ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">smarttechsolution92gmail.com</span>
                </div>
                <div
                  className={`flex items-center space-x-2 transition-colors ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+251-940-13-16-96</span>
                </div>
                <div
                  className={`flex items-center space-x-2 transition-colors ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className={`space-y-2 transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className={`transition-colors text-left ${
                      isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                    }`}
                  >
                    Website Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className={`transition-colors text-left ${
                      isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                    }`}
                  >
                    Mobile Apps
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className={`transition-colors text-left ${
                      isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                    }`}
                  >
                    Digital Marketing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className={`transition-colors text-left ${
                      isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                    }`}
                  >
                    Social Media
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className={`space-y-2 transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className={`transition-colors text-left ${
                      isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                    }`}
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("work")}
                    className={`transition-colors text-left ${
                      isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                    }`}
                  >
                    Our Work
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className={`transition-colors text-left ${
                      isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                    }`}
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={`transition-colors text-left ${
                      isDarkMode ? "hover:text-white" : "hover:text-slate-900"
                    }`}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Get Started</h3>
              <p className={`mb-4 text-sm transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Ready to transform your business?
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-4" onClick={() => setIsContactOpen(true)}>
                Get Free Quote
              </Button>
              <div className="py-4">
  <h3
    className={`text-lg font-semibold mb-3 transition-colors ${
      isDarkMode ? "text-blue-400" : "text-blue-600"
    }`}
  >
    Follow Us
  </h3>
  <div
    className={`flex space-x-4 text-sm transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
  >
    <a href="https://web.facebook.com/profile.php?id=61578786200814" target="_blank" rel="noopener noreferrer">
      <img
        src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg"
        alt="Facebook"
        className="w-6 h-6"
        style={{ filter: "invert(31%) sepia(98%) saturate(2050%) hue-rotate(180deg) brightness(95%) contrast(101%)" }}
      />
    </a>
    <a href="https://www.instagram.com/smarttech_solution1/" target="_blank" rel="noopener noreferrer">
      <img
        src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg"
        alt="Instagram"
        className="w-6 h-6"
        style={{ filter: "invert(31%) sepia(98%) saturate(2050%) hue-rotate(180deg) brightness(95%) contrast(101%)" }}
      />
    </a>
    <a href="https://x.com/smar_tech9" target="_blank" rel="noopener noreferrer">
      <img
        src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg"
        alt="X (Twitter)"
        className="w-6 h-6"
        style={{ filter: "invert(31%) sepia(98%) saturate(2050%) hue-rotate(180deg) brightness(95%) contrast(101%)" }}
      />
    </a>
  </div>
</div>
            </div>
          </div>

          <div
            className={`border-t mt-12 pt-8 text-center transition-colors ${
              isDarkMode ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"
            }`}
          >
            <p>&copy; 2025 Smart Tech Solution. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
