hi"use client"

import React, { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const projects = [
  {
    title: "Waweru Advocates Website",
    description:
      "A fully responsive website built using React and Node.js for a law firm.",
    image: "project1.JPG",
    technologies: ["React", "Node.js"],
    githubLink: "https://github.com/Kimdev-254/waweruAdvocates.git",
    liveLink: "https://example.com",
  },
  {
    title: "Firebase Form App for Student Documentation",
    description:
      "A Firebase-based app that manages student attachment reports and documentation.",
    image: "project2.JPG",
    technologies: ["Next.js", "Firebase", "TailwindCSS"],
    githubLink: "https://github.com/Kimdev-254/Next.js-Firebase-app.git",
    liveLink: "https://attachmentdocs-fbce6.web.app/",
  },
  {
    title: "Mobile App Mockup Design",
    description: "A high-fidelity mobile app mockup designed using Figma.",
    image: "project3.JPG",
    technologies: ["Figma"],
  },
]

const ProjectCard = ({ project }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="relative mx-2"
    >
      <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
          <div>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            {project.description && (
              <p className="mb-4 text-sm">{project.description}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-r from-black to-slate-900 text-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 shadow-md">
          Projects Completed
        </h2>
        <Slider {...settings}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Projects
