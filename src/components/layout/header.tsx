import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";

// Fix the getInitials function to handle undefined/null values safely
function getInitials(name?: string): string {
  // If name is undefined or null, return a default value
  if (!name) return "U";

  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export default function Header() {
  const { user, logout } = useAuth();
  
  // Get user initials safely
  const userInitials = user?.name ? getInitials(user.name) : "U";
  
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="text-xl font-bold tracking-tight">
              ContractPay
            </a>
          </Link>
        </div>

        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
          {user && (
            <>
              <Link href="/dashboard">
                <a className="text-sm font-medium transition-colors hover:text-primary">
                  Dashboard
                </a>
              </Link>
              <Link href="/contracts">
                <a className="text-sm font-medium transition-colors hover:text-primary">
                  Contracts
                </a>
              </Link>
              <Link href="/payments">
                <a className="text-sm font-medium transition-colors hover:text-primary">
                  Payments
                </a>
              </Link>
              <Link href="/templates">
                <a className="text-sm font-medium transition-colors hover:text-primary">
                  Templates
                </a>
              </Link>
            </>
          )}
        </nav>
        
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">{user.name || "User"}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <a>
                  <Button variant="ghost">Log In</Button>
                </a>
              </Link>
              <Link href="/register">
                <a>
                  <Button>Register</Button>
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}