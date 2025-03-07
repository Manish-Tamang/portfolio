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
                <Button variant="ghost" onClick={() => signOut()}>
                    Logout
                </Button>
            )}
        </>
    );
};

export default AuthButtons;