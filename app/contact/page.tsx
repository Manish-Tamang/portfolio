"use client"

import React, { useState } from "react"
import { Mail, Phone, Send, Loader2, Clock, MapPin, Linkedin } from "lucide-react"

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
        <div className="flex flex-col items-start justify-center max-w-[45rem] mx-auto mb-16 px-4 mt-10">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white transform transition-transform duration-300 hover:scale-110">
                Contact Me ☎️
            </h1>

            <p className="mb-4 text-gray-600 dark:text-gray-400">
                Thank you for visiting my website. I'm always happy to hear from you and answer any questions you may have.
                Please fill out the form below with your name. You can also reach out to me personally at{" "}
                <a href="mailto:maneshtamang833@gmail.com" className="text-blue-500 hover:underline">
                    maneshtamang833@gmail.com
                </a>.
            </p>

            <div className="w-full mx-auto">
                <div className="mt-4 grid items-start lg:grid-cols-2 gap-8 lg:gap-4">
                    {/* Contact Form */}
                    <div className="flex flex-col border border-blue-200 shadow-3xl rounded-[4px] p-6 lg:p-8 bg-white dark:border-gray-700 dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="py-3 px-4 block w-full border-gray-200 rounded-[4px] text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Full Name*"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="py-3 px-4 block w-full border-gray-200 rounded-[4px] text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Email*"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="sr-only">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="py-3 px-4 block w-full border-gray-200 rounded-[4px] text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Phone Number*"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="sr-only">
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="py-3 px-4 block w-full border-gray-200 rounded-[4px] text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Select Enquiry Type*</option>
                                    {enquiryTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="py-3 px-4 block w-full border-gray-200 rounded-[4px] text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-200 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Message*"
                                />
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full inline-flex rounded-[4px] justify-center items-center px-4 py-3 bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:hover:bg-blue-500"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Send
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="mt-3 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    I'll get back to you within 24 hours.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="border border-blue-200 shadow-3xl rounded-[4px] p-6 lg:p-8 bg-white dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                <a href="mailto:maneshtamang833@gmail.com"
                                    className="flex items-center space-x-4 p-4 rounded-[4px] hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                        <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Email</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">maneshtamang833@gmail.com</p>
                                    </div>
                                </a>

                                <a href="https://www.linkedin.com/in/manish-tamang"
                                    className="flex items-center space-x-4 p-4 rounded-[4px] hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                        <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Linkedin</p>
                                        <p className="text-gray-600 dark:text-gray-400">Manish Tamang</p>
                                    </div>
                                </a>

                                <div className="flex items-center space-x-4 p-4 rounded-[4px] hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                        <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Location</p>
                                        <p className="text-gray-600 dark:text-gray-400">Itahari, Nepal</p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <div className="flex items-center space-x-4">
                                        <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Business Hours</p>
                                            <p className="text-gray-600 dark:text-gray-400">Mon - Fri: 9:00 AM - 5:00 PM</p>
                                            <p className="text-gray-600 dark:text-gray-400">Sat - Sun: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage