import Image from "next/image";
import { ContentSection } from "./ContentSection";
import { SectionTitle } from "./SectionTitle";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto ">
        <div className="relative pl-4 sm:pl-6 lg:pl-8">
          {/* Green vertical line */}
          <div className="absolute bottom-0 left-0 top-2 w-1 bg-emerald-600" />

          {/* Content */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-8 ">
              <SectionTitle
                title="About Bloomiot"
                subtitle="Empowering Smart Agriculture"
              />

              <ContentSection>
                <div className="space-y-6">
                  <p>
                    At Bloomiot, we believe that technology should be simple,
                    accessible, and capable of driving the growth of your crops
                    in an intelligent way. We are a company based in Santa
                    Catarina, Brazil, that operates remotely to provide IoT
                    solutions to small and medium-scale greenhouses around the
                    world. Our goal is to help you maximize the productivity and
                    efficiency of your crops, without technical complications
                    and with the advice you need at your fingertips.
                  </p>

                  <p>
                    Our story began with a group of experts in electronics,
                    software, and agriculture who were passionate about
                    innovation. We observed that many small and medium-sized
                    producers were facing challenges such as a lack of
                    automation, variable control, and adequate monitoring of
                    their greenhouses. From this need, Bloomiot was born: a
                    comprehensive platform that combines physical devices
                    (sensors and actuators), adaptable firmware, and an
                    intuitive web interface so that anyone, regardless of their
                    technical experience, can monitor and manage their
                    greenhouse in real time.
                  </p>

                  <p>
                    We are driven by a commitment to sustainability and
                    efficiency. Our multidisciplinary team works collaboratively
                    and completely online, allowing us to provide continuous
                    support and updates no matter where you are. Thanks to this
                    remote work modality, we respond quickly to the needs of our
                    clients, maintaining affordable costs and promoting
                    responsible use of natural resources.
                  </p>
                </div>
              </ContentSection>
            </div>
            <div className="overflow-hidden flex items-center">
              <Image
                src="/about2.jpg"
                alt="Growers analyzing data on tablet"
                width={900}
                height={400}
                className="w-full object-cover rounded-lg "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
