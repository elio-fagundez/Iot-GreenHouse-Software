interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg bg-green-50/90 hover:bg-emerald-900 p-8  hover:text-white text-gray-900 cursor-pointer transition-colors">
      <div className="flex items-start space-x-2">
        <div className="h-6 w-px bg-[#008D36]" />
        <div>
          <h3 className="mb-4 text-2xl font-medium text-[#008D36]">
            {title}
          </h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
