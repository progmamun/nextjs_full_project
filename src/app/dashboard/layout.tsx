// app/dashboard/layout.tsx
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 dark:bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            Participants
          </Button>
          <SignOutButton>
            <Button variant="ghost" type="submit" className="w-full justify-start">
              Logout
            </Button>
            </SignOutButton>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
