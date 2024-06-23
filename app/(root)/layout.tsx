import LeftSideBar from "@/components/leftSideBar";
import RightSideBar from "@/components/rightSideBar";
import Image from "next/image";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex flex-col">
            <main className="relative flex bg-black-3">
                <LeftSideBar />

                <section>
                    <div>
                        <div>
                            <Image />
                            MobileNav
                        </div>
                    </div>
                    <div>
                        {children}
                        Toaster
                    </div>
                </section>
                <RightSideBar />
            </main>
        </div>
    );
}
