interface SectionTitleProps {
    title: string
    subtitle: string
  }
  
  export function SectionTitle({ title, subtitle }: SectionTitleProps) {
    return (
      <div className="mb-6">
        <h2 className="text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
          <span className="text-emerald-600">{title}</span>
          <br />
          <span className="text-gray-900">{subtitle}</span>
        </h2>
      </div>
    )
  }
  
  