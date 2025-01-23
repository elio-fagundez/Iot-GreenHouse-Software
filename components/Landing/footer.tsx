import Link from "next/link"
import { Instagram, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="grid grid-cols-3 gap-0.5 mr-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-[#00A651] rounded-full" />
              ))}
            </div>
            <span className="text-xl font-semibold">GreenHouse IoT</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#00A651] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-white hover:text-[#00A651]" viewBox="0 0 30 30" width="24px" height="24px">
  <path fill="currentColor" d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"/>
</svg>
<span className="sr-only">X</span>
            </Link>
            <Link href="#" className="hover:text-[#00A651] transition-colors">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="hover:text-[#00A651] transition-colors">
              <Youtube className="w-6 h-6" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#" className="hover:text-[#00A651] transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        <hr className="border-gray-800 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About GreenHouse IoT</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus
              ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  Delivery Details
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  Free eBooks
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  Development Tutorial
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  How to - Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#00A651] transition-colors">
                  Youtube Playlist
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

