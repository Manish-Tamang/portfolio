"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from "next-auth/react";

const SignInCard = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="rounded-[4px] p-6 w-full bg-blue-50 dark:bg-[#09090B] border border-blue-100 dark:border-gray-700">
                { }
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Sign the Guestbook
                </h2>

                { }
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Please login with below methods to share a message for a future visitor of my site.
                </p>

                <div className="flex gap-2">
                    { }
                    <Button
                        variant="outline"
                        onClick={() => signIn("google")}
                        className="flex items-center rounded-[4px] justify-center border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white w-1/2"
                    >
                        <FcGoogle className="mr-2" />
                        Google
                    </Button>

                    { }
                    <Button
                        variant="outline"
                        onClick={() => signIn("github")}
                        className="flex items-center rounded-[4px] justify-center border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white w-1/2"
                    >
                        <FaGithub className="mr-2" />
                        GitHub
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignInCard;