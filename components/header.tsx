import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { Headerlogo } from "./header-logo"
import { Navigation } from "./navigation"
import { Loader2 } from "lucide-react"
import { WelcomeMessage } from "./welcome-msg"

export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <Headerlogo />
                        <Navigation />
                    </div>
                    <ClerkLoaded>
                         <UserButton afterSignOutUrl="/" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="size-8 animate-spin text-slate-400"/>
                    </ClerkLoading>
                </div>
                <WelcomeMessage />
            </div>
        </header>
    )
}