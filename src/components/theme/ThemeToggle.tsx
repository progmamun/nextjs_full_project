"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      {/* Dropdown Trigger */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        align="end"
        className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-2 space-y-1"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-all cursor-pointer"
        >
          <Sun className="h-4 w-4 text-gray-900 dark:text-gray-100" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-all cursor-pointer"
        >
          <Moon className="h-4 w-4 text-gray-900 dark:text-gray-100" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-all cursor-pointer"
        >
          <span className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
