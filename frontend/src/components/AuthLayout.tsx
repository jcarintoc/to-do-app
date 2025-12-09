import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { AuthIllustration } from "./AuthIllustration";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  illustrationTitle: string;
  illustrationDescription: string;
}

export function AuthLayout({
  children,
  title,
  illustrationTitle,
  illustrationDescription,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md overflow-hidden flex">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <Logo className="mb-12" />

          <div className="max-w-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
            {children}
          </div>
        </div>

        {/* Right side - Illustration */}
        <AuthIllustration title={illustrationTitle} description={illustrationDescription} />
      </div>
    </div>
  );
}
