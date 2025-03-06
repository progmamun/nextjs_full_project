export default function QuizLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground dark:bg-gray-900">

            {children}

        </div>
    );
}