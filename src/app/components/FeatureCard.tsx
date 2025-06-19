'use client';

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className={cn(
      "bg-black/30 border-primary/20 backdrop-blur-xl transition-all duration-300 hover:border-primary hover:-translate-y-2",
      "hover:shadow-[0_0_20px_rgba(115,103,240,0.5)]"
    )}>
      <CardContent className="p-8">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className={cn("text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent")}>{title}</h3>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}