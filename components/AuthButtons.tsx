"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface AuthButtonsProps {
    session: any;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ session }) => {
    const handleLogout = async () => {
        try {
            // Sign out and redirect back to guestbook page
            await signOut({ 
                callbackUrl: '/guestbook'
            });
        } catch (error) {
            console.error('Error during logout:', error);
            // Fallback: force redirect if signOut fails
            window.location.href = '/guestbook';
        }
    };

    return (
        <>
            {session?.user && (
                <Button type="button" className="hover:text-red-600" onClick={handleLogout}>
                    Logout
                </Button>
            )}
        </>
    );
};

export default AuthButtons;