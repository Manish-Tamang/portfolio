"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface AuthButtonsProps {
    session: any;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ session }) => {
    const handleLogout = async () => {
        try {
            await signOut({ 
                callbackUrl: '/guestbook'
            });
        } catch (error) {
            console.error('Error during logout:', error);
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