interface ContentSectionProps {
    children: React.ReactNode
  }
  
  export function ContentSection({ children }: ContentSectionProps) {
    return <div className="w-auto text-lg leading-relaxed text-gray-600">{children}</div>
  }
  
  