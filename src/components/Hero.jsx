"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const Hero = () => {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [downloadError, setDownloadError] = useState(null)

  const textArray = useMemo(() => ["Software Developer", "Tech Enthusiast"], [])
  const period = 2000

  const tick = useCallback(() => {
    let i = loopNum % textArray.length
    let fullText = textArray[i]
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) {
      setTypingSpeed((prevSpeed) => prevSpeed / 2)
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setTypingSpeed(period)
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false)
      setLoopNum((prevLoopNum) => prevLoopNum + 1)
      setTypingSpeed(150)
    }
  }, [isDeleting, loopNum, text, textArray, period])

  useEffect(() => {
    const ticker = setInterval(tick, typingSpeed)
    return () => clearInterval(ticker)
  }, [tick, typingSpeed])

  const handleDownload = async () => {
    try {
      // Use the full URL to your resume file
      const resumeUrl =
        "https://Kimdev-254.github.io/portfolioproject/Resume.pdf"
      const response = await fetch(resumeUrl)
      if (!response.ok) throw new Error("Resume file not found")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = "Boniface_Kimani_Resume.pdf"
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
      document.body.removeChild(a)
      setDownloadError(null)
    } catch (error) {
      console.error("Download failed:", error)
      setDownloadError("Failed to download resume. Please try again later.")
    }
  }

  return (
    <section className="bg-clip-text bg-gradient-to-r from-blue-950 to-slate-900 bg-center bg-cover pt-16 pb-8 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl text-white font-extrabold mb-6 tracking-tight leading-tight">
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">
                Boniface Kimani
              </span>
            </h1>

            <h2 className="text-3xl md:text-4xl font-medium mb-8 h-20 animate-pulse text-white">
              I&apos;m a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
                {text}
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
              I craft elegant solutions to complex problems, turning ideas into
              reality through code.
            </p>

            <div className="flex flex-col items-start mt-8">
              <button
                onClick={handleDownload}
                className="inline-block rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:fade-in-90"
              >
                Download Resume
              </button>
              {downloadError && (
                <p className="text-red-500 mt-2">{downloadError}</p>
              )}
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-yellow-300 rounded-tr-[60px] rounded-bl-[60px] transform md:hidden"></div>
              <Image
                src="myimage.JPG"
                alt="Boniface Kimani"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="rounded-tr-[60px] rounded-bl-[60px] transform md:rotate-12 shadow-lg shadow-yellow-500/50"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
