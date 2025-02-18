// 'use client';

// import React from 'react';
// import { Sun, Moon } from 'lucide-react';
// import { useTheme } from './ThemeProvider';

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors duration-200"
//       aria-label="Toggle theme"
//     >
//       {theme === 'light' ? (
//         <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
//       ) : (
//         <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
//       )}
//     </button>
//   );
// };

// export default ThemeToggle;

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
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
