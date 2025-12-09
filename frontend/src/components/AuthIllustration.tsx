interface AuthIllustrationProps {
  title: string;
  description: string;
}

export function AuthIllustration({ title, description }: AuthIllustrationProps) {
  return (
    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-teal-50 to-cyan-100 items-center justify-center p-12">
      <div className="text-center">
        <svg
          className="w-full max-w-md mx-auto"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Window */}
          <rect x="220" y="40" width="140" height="180" rx="4" stroke="#0D9488" strokeWidth="3" fill="none" />
          <line x1="290" y1="40" x2="290" y2="220" stroke="#0D9488" strokeWidth="2" />
          <line x1="220" y1="130" x2="360" y2="130" stroke="#0D9488" strokeWidth="2" />

          {/* Person on beanbag */}
          <ellipse cx="160" cy="250" rx="80" ry="20" fill="#0D9488" opacity="0.2" />
          <ellipse cx="140" cy="220" rx="50" ry="40" fill="#14B8A6" />

          {/* Person body */}
          <circle cx="150" cy="150" r="20" fill="#374151" />
          <rect x="130" y="170" width="40" height="50" rx="8" fill="#1F2937" />

          {/* Laptop */}
          <rect x="110" y="200" width="60" height="35" rx="3" fill="#374151" />
          <rect x="100" y="235" width="80" height="5" rx="2" fill="#4B5563" />

          {/* Plant */}
          <rect x="320" y="240" width="20" height="30" rx="2" fill="#0D9488" />
          <ellipse cx="330" cy="230" rx="15" ry="20" fill="#14B8A6" />
          <ellipse cx="320" cy="220" rx="10" ry="15" fill="#2DD4BF" />
          <ellipse cx="340" cy="225" rx="8" ry="12" fill="#2DD4BF" />

          {/* Floating elements */}
          <rect x="280" y="80" width="50" height="30" rx="4" fill="#E0F2FE" stroke="#0D9488" strokeWidth="1" />
          <line x1="290" y1="90" x2="320" y2="90" stroke="#0D9488" strokeWidth="2" />
          <line x1="290" y1="100" x2="310" y2="100" stroke="#0D9488" strokeWidth="2" />

          {/* Coffee cup */}
          <ellipse cx="270" cy="255" rx="12" ry="5" fill="#9CA3AF" />
          <rect x="258" y="245" width="24" height="15" rx="2" fill="#D1D5DB" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-700 mt-6">{title}</h2>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>
    </div>
  );
}
