"use client"

import { useUser } from "@clerk/nextjs"

export const WelcomeMessage = () => {
    const { user, isLoaded } = useUser()

    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl text-white font-medium">Welcome back, {isLoaded ? ", " : " "}{user?.fullName}</h2>
            <p className="text-sm lg:text-base">This is your financial overview</p>
        </div>
    )
}