"use client"

import React, { useState } from "react"
import { Mail, Send, Loader2, MapPin, Linkedin, Clock } from "lucide-react"

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })

    const enquiryTypes = [
        "General Inquiry",
        "Project Collaboration",
        "Job Opportunity",
        "Consulting Services",
        "Technical Support",
        "Other"
    ]

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                }),
            })

            if (response.ok) {
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
                alert("Message sent successfully! We'll respond within 24 hours.")
            } else {
                throw new Error()
            }
        } catch (error) {
            alert("Failed to send message. Please try again later.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 relative">
            <div className="absolute top-12 left-0 w-24 h-24 bg-[#7AC594] rounded-[4px] opacity-20 -z-10"></div>
            <div className="absolute bottom-24 right-8 w-40 h-40 bg-[#7AC594] rounded-[4px] opacity-10 -z-10"></div>
            <div className="absolute top-40 right-12 w-16 h-16 bg-[#7AC594] rounded-[4px] opacity-15 -z-10"></div>
            <div className="absolute bottom-12 left-16 w-32 h-32 bg-[#7AC594] rounded-[4px] opacity-10 -z-10"></div>
            
            <h1 className="text-4xl font-peachi mb-6 text-[#38A662] relative">
                Get in touch
                <div className="absolute -bottom-2 left-0 h-1 w-16 bg-[#7AC594] rounded-[4px]"></div>
            </h1>

            <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-2xl">
                Feel free to reach out with any questions or opportunities. I'll get back to you as soon as possible.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white dark:bg-gray-800 rounded-[4px] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#7AC594]"></div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-200 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#38A662] bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Full Name"
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-200 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#38A662] bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Email Address"
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-200 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#38A662] bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Phone Number"
                            />
                        </div>

                        <div>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-200 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#38A662] bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">Select Inquiry Type</option>
                                {enquiryTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full p-3 border border-gray-200 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#38A662] bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Your Message"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full p-3 rounded-[4px] flex items-center justify-center font-medium text-white bg-[#38A662] hover:bg-[#2c844e] transition-colors duration-200 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </>
                            )}
                        </button>
                        
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
                            I'll respond within 24 hours
                        </p>
                    </form>
                </div>
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-[4px] shadow-sm p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1 h-full bg-[#7AC594]"></div>
                        
                        <h2 className="text-xl font-semibold mb-6 text-[#38A662]">Contact Details</h2>

                        <div className="space-y-6">
                            <a 
                                href="mailto:maneshtamang833@gmail.com"
                                className="flex items-center space-x-4 group"
                            >
                                <div className="p-2 rounded-[4px] bg-gray-100 dark:bg-gray-700 group-hover:bg-[#7AC594]/20 transition-colors">
                                    <Mail className="w-5 h-5 text-[#38A662]" />
                                </div>
                                <div>
                                    <p className="text-gray-800 dark:text-white font-medium">Email</p>
                                    <p className="text-gray-600 dark:text-gray-300">maneshtamang833@gmail.com</p>
                                </div>
                            </a>

                            <a 
                                href="https://www.linkedin.com/in/manish-tamang"
                                className="flex items-center space-x-4 group"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="p-2 rounded-[4px] bg-gray-100 dark:bg-gray-700 group-hover:bg-[#7AC594]/20 transition-colors">
                                    <Linkedin className="w-5 h-5 text-[#38A662]" />
                                </div>
                                <div>
                                    <p className="text-gray-800 dark:text-white font-medium">LinkedIn</p>
                                    <p className="text-gray-600 dark:text-gray-300">Manish Tamang</p>
                                </div>
                            </a>

                            <div className="flex items-center space-x-4">
                                <div className="p-2 rounded-[4px] bg-gray-100 dark:bg-gray-700">
                                    <MapPin className="w-5 h-5 text-[#38A662]" />
                                </div>
                                <div>
                                    <p className="text-gray-800 dark:text-white font-medium">Location</p>
                                    <p className="text-gray-600 dark:text-gray-300">Itahari, Nepal</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 rounded-[4px] bg-gray-100 dark:bg-gray-700">
                                        <Clock className="w-5 h-5 text-[#38A662]" />
                                    </div>
                                    <div>
                                        <p className="text-gray-800 dark:text-white font-medium">Working Hours</p>
                                        <p className="text-gray-600 dark:text-gray-300">Mon - Fri: 9:00 AM - 5:00 PM</p>
                                        <p className="text-gray-600 dark:text-gray-300">Sat - Sun: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-[4px] p-6 bg-[#7AC594]/10 border border-[#7AC594]/20 relative overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#7AC594] rounded-full opacity-10"></div>
                        <p className="text-[#38A662] font-medium">Ready to collaborate?</p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            I'm always open to discussing new projects and opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage