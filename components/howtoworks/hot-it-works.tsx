import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import alerta from "../../public/icons/alerta.png";
import dashboard from "../../public/icons/dasshboard.png";
import instalar from "../../public/icons/instalar.png";
import nube from "../../public/icons/nube.png";
import puertos from "../../public/icons/puertos.png";

export function HowItWorks() {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Bloomiot Works</h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            At Bloomiot, we want the automation and monitoring of your greenhouse to be a simple process free of
            technical complications.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 md:left-1/2" />

          {/* Step 1 */}
          <div className="relative mb-16 last:mb-0">
            {/* Number circle */}
            <div className="absolute left-0 w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-black font-bold md:left-[calc(50%-1rem)]">
              1
            </div>

            <div className="ml-16 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:pr-16">
              <div className="md:text-right">
                <h3 className="text-xl font-bold mb-4">Select your Plan</h3>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Evaluate your needs</h4>
                  <p className="text-gray-600">
                    Start by identifying how many sensors, variables and type of control you need for your greenhouse. Do you only require monitoring, or do you also want to control irrigation and ventilation remotely? Our plans (Basic, Advanced and Enterprise) adapt to different crop sizes and levels of automation.
                  </p>
                </div>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Make your subscription</h4>
                  <p className="text-gray-600">
                    Once you choose the most suitable plan, complete your online registration and select the payment method that suits you best (monthly or annual). With this, you are ready to receive your kit and access the platform.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image src={dashboard} alt="Dashboard Icon" width={96} height={96} />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative mb-16 last:mb-0">
            {/* Number circle */}
            <div className="absolute left-0 w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-black font-bold md:left-[calc(50%-1rem)]">
              2
            </div>

            <div className="ml-16 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:col-start-2 md:pl-16">
              <div className="flex justify-center items-center">
                <Image src={puertos} alt="Puertos Icon" width={96} height={96} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Receive Your Hardware Kit</h3>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Welcome Kit</h4>
                  <p className="text-gray-600">
                    We will send you (via local or international shipping) your kit with the necessary sensors and devices, along with a quick installation guide. Each piece is designed to be easy to connect and configure.
                  </p>
                </div>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Component Check</h4>
                  <p className="text-gray-600">
                    Before installation, check that your kit includes all the devices: temperature/humidity sensors, actuators for irrigation or ventilation, and a connection module to link the hardware to the Bloomiot cloud.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative mb-16 last:mb-0">
            {/* Number circle */}
            <div className="absolute left-0 w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-black font-bold md:left-[calc(50%-1rem)]">
              3
            </div>

            <div className="ml-16 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:pr-16">
              <div className="md:text-right">
                <h3 className="text-xl font-bold mb-4">Installation and Configuration</h3>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Connect the devices</h4>
                  <p className="text-gray-600">
                    Bloomiot sensors and actuators are installed at key points in your greenhouse (for example, in growing areas or irrigation systems). It only requires a few assembly steps to get them ready.
                  </p>
                </div>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Sync with the Platform</h4>
                  <p className="text-gray-600">
                    Once all the hardware is in place, log in to your account on the Bloomiot web platform and follow the setup instructions. The process is &quot;Plug &amp; Play&quot;: connect the communication module and link your sensors to the system automatically.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image src={instalar} alt="Instalar Icon" width={96} height={96} />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative mb-16 last:mb-0">
            {/* Number circle */}
            <div className="absolute left-0 w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-black font-bold md:left-[calc(50%-1rem)]">
              4
            </div>

            <div className="ml-16 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:col-start-2 md:pl-16">
              <div className="flex justify-center items-center">
                <Image src={nube} alt="Nube Icon" width={96} height={96} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Monitor and Control in Real Time</h3>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Web and Mobile Platform</h4>
                  <p className="text-gray-600">
                    Your Bloomiot account allows you to view greenhouse data from any device with internet. In addition to monitoring temperature, humidity, irrigation, and other parameters, you can set up alerts to receive instant notifications when something goes outside the desired values.
                  </p>
                </div>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Remote Control and Automations</h4>
                  <p className="text-gray-600">
                    With the platform, you don&apos;t just check the status of your crops: you can also turn ventilation systems on or off, schedule irrigation times, and adjust lights to maximize the growth of your plants. All in real time, no matter where you are.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative mb-16 last:mb-0">
            {/* Number circle */}
            <div className="absolute left-0 w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-black font-bold md:left-[calc(50%-1rem)]">
              5
            </div>

            <div className="ml-16 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:pr-16">
              <div className="md:text-right">
                <h3 className="text-xl font-bold mb-4">Support and Updates</h3>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Continuous Advice</h4>
                  <p className="text-gray-600">
                    If you have questions when installing, need to customize the configuration, or simply want to optimize your greenhouse, our remote support team is ready to help you. You can contact us via chat, email, or video call.
                  </p>
                </div>
                <div className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-emerald-600 mb-2">Constant Improvements</h4>
                  <p className="text-gray-600">
                    At Bloomiot, we constantly work to perfect our firmware and update the platform with new features. Thanks to our cloud system, improvements are applied automatically, without you having to make complicated changes.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image src={alerta} alt="Alerta Icon" width={96} height={96} />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600">
            Enjoy a simpler, more productive, and more sustainable growing experience. With Bloomiot, you have full
            control of your greenhouse in the palm of your hand. Choose your plan, receive your kit and let technology
            do the rest. Welcome to the new era of smart farming!
          </p>
          <Link href="/#pricing">
            <Button className="bg-emerald-400 text-black hover:bg-[#008D36]">Choose Your Plan</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}