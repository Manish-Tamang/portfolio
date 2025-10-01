"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface AuthButtonsProps {
    session: any;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ session }) => {
    return (
        <>
            {session?.user && (
                <Button type="button" className="hover:text-red-600" onClick={() => signOut({ callbackUrl: '/guestbook' })}>
                    Logout
                </Button>
            )}
        </>
    );
};

export default AuthButtons;