'use client';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}