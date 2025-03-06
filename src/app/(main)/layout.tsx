import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground dark:bg-gray-900">
            <Navigation />
            {children}
            <Footer />
        </div>
    );
}