import Image from "next/image";
import { ContentSection } from "../About/ContentSection";
import { SectionTitle } from "../About/SectionTitle";

interface ContentItem {
  title: string;
  paragraphs: string[];
}

interface ServiceSectionProps {
  title?: string;
  subtitle: string;
  content: ContentItem[];
  imageSrc: string;
  imageAlt: string;
}

export default function ServiceAditionalSection({
  title,
  subtitle,
  content,
  imageSrc,
  imageAlt,
}: ServiceSectionProps) {
  return (
    <section
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      id="service-section"
    >
      <div className="relative mx-auto">
        <div className="relative pl-4 sm:pl-6 lg:pl-8">
          {/* Green vertical line */}

          {/* Content */}
          <div className="grid grid-cols-5 gap-8">
            <div className="overflow-hidden flex items-center col-span-3">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={900}
                height={400}
                className="w-full object-cover rounded-lg"
              />
            </div>
            <div className="space-y-8 col-span-2">
              <SectionTitle title={title ?? ""} subtitle={subtitle ?? ""} />

              {content.map((item, index) => (
                <ContentSection key={index}>
                  <h3 className="text-xl font-semibold text-emerald-600 mb-4">
                    {item.title}
                  </h3>
                  <div className="space-y-6">
                    {item.paragraphs.map((paragraph, pIndex) => (
                      <p className="text-gray-400" key={pIndex}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </ContentSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
