"use client"

import React, { useState } from "react"
import { Mail, Send, Loader2, MapPin, Linkedin, Clock } from "lucide-react"
import toast, { Toaster } from 'react-hot-toast'

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        message: "",
        emotion: "",
        category: "general"
    })

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
                setFormData({ email: "", message: "", emotion: "", category: "general" })
                toast.success("Message sent successfully!")
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error("Failed to send message. Please try again later.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleEmotionSelect = (emotion: string) => {
        setFormData({ ...formData, emotion })
    }

    const handleCategorySelect = (category: string) => {
        setFormData({ ...formData, category })
    }

    return (
        <div className="max-w-xl mx-auto px-6 py-12 relative text-gray-800 dark:text-gray-100">
            <Toaster />
            <h1 className="text-4xl font-bold mb-2 font-peachi text-left">Contact me</h1>
            <p className="text-gray-700 dark:text-gray-300 text-left mb-8">
                Feel free to reach out with any questions or opportunities. I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-gray-700 dark:text-white">
                        Your email address <span className="text-gray-400">(required)</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full p-4 rounded bg-gray-100 dark:bg-[#1e2738] border border-gray-300 dark:border-[#30363d] text-gray-800 dark:text-white focus:outline-none focus:border-[#38A662]"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="block text-gray-700 dark:text-white">
                        Your message <span className="text-gray-400">(required)</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full p-4 rounded bg-gray-100 dark:bg-[#1e2738] border border-gray-300 dark:border-[#30363d] text-gray-800 dark:text-white focus:outline-none focus:border-[#38A662]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-x-4">
                    <div className="space-y-2">
                        <label className="block text-gray-700 dark:text-white">Emotion</label>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                className={`p-3 rounded bg-gray-100 dark:bg-[#1e2738] border ${formData.emotion === "happy" ? "border-[#38A662]" : "border-gray-300 dark:border-[#30363d]"} `}
                                onClick={() => handleEmotionSelect("happy")}
                            >
                                <span role="img" aria-label="happy" className="text-xl">😍</span>
                            </button>
                            <button
                                type="button"
                                className={`p-3 rounded bg-gray-100 dark:bg-[#1e2738] border ${formData.emotion === "thanks" ? "border-[#38A662]" : "border-gray-300 dark:border-[#30363d]"} `}
                                onClick={() => handleEmotionSelect("thanks")}
                            >
                                <span role="img" aria-label="thanks" className="text-xl">👋</span>
                            </button>
                            <button
                                type="button"
                                className={`p-3 rounded bg-gray-100 dark:bg-[#1e2738] border ${formData.emotion === "gift" ? "border-[#38A662]" : "border-gray-300 dark:border-[#30363d]"} `}
                                onClick={() => handleEmotionSelect("gift")}
                            >
                                <span role="img" aria-label="gift" className="text-xl">🎁</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-700 dark:text-white">Category</label>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                className={`p-3 rounded bg-gray-100 dark:bg-[#1e2738] border ${formData.category === "general" ? "border-[#38A662]" : "border-gray-300 dark:border-[#30363d]"} text-gray-700 dark:text-white px-4`}
                                onClick={() => handleCategorySelect("general")}
                            >
                                general
                            </button>
                            <button
                                type="button"
                                className={`p-3 rounded bg-gray-100 dark:bg-[#1e2738] border ${formData.category === "help" ? "border-[#38A662]" : "border-gray-300 dark:border-[#30363d]"} text-gray-700 dark:text-white px-4`}
                                onClick={() => handleCategorySelect("help")}
                            >
                                help
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer transition-all bg-[#38A662] text-white px-6 py-2 rounded-[4px]
border-[#2D8A4D] w-full
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 inline animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send message"
                    )}
                </button>
            </form>

            <p className="mt-4 text-gray-700 dark:text-white">
                You can also contact me at <a href="mailto:maneshtamang833@gmail.com" className="text-[#38A662]">maneshtamang833@gmail.com</a>
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                This page is inspired by <a href="https://www.totaltypescript.com/contact" className="underline">Total TypeScript</a>.
            </p>
        </div>
    )
}

export default ContactPage