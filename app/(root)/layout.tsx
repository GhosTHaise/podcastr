import LeftSideBar from "@/components/leftSideBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex flex-col">
            <main className="relative flex bg-black-3">
                <LeftSideBar />
                {children}
                <p className="text-white-1">RIGHT SIDEBAR</p>
            </main>
        </div>
    );
}
