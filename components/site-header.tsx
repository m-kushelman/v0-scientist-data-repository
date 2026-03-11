"use client"

import Link from "next/link"
import { User, Settings, FileText, Bookmark, LogOut, ChevronDown, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<{
    email: string
    firstName: string
    lastName: string
    isLoggedIn: boolean
  } | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      const user = JSON.parse(userData)
      if (user.isLoggedIn) {
        setCurrentUser(user)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    router.push("/")
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <>
      <div className="w-full bg-spin-orange text-white py-2 px-4 text-center text-sm font-medium">
        <div className="container flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>Pre-Alpha Version - Platform under active development</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full bg-spin-navy text-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/parallax-logo.png" alt="parallax logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-white">parallax</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/search" className="text-sm font-medium text-white/80 hover:text-white">
              Search
            </Link>
            <Link href="/browse" className="text-sm font-medium text-white/80 hover:text-white">
              Browse
            </Link>
            {currentUser && (
              <Link href="/submit" className="text-sm font-medium text-white/80 hover:text-white">
                Submit
              </Link>
            )}
            <Link href="/about" className="text-sm font-medium text-white/80 hover:text-white">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-spin-orange text-white text-sm">
                        {getInitials(currentUser.firstName, currentUser.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm">
                      {currentUser.firstName} {currentUser.lastName}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {currentUser.firstName} {currentUser.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Personal Information
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/submissions" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      My Submissions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/saved" className="flex items-center">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Saved Posts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-spin-navy bg-white hover:bg-white/90 hover:text-spin-navy"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-spin-gradient-from to-spin-gradient-to hover:opacity-90"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
