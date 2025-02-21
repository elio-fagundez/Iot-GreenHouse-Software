import Link from "next/link"
import { LayoutDashboard, Home, Thermometer, Droplets, Sun, Wind, Gauge, Power, Settings, Shield } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-[240px] h-screen bg-background p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div className="grid grid-cols-3 gap-0.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#00A651] rounded-full" />
          ))}
        </div>
        <span className="font-semibold">Bloomiot</span>
      </div>

      <nav className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground px-2">GENERAL</h4>
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <Home size={16} />
              Green Houses
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground px-2">SENSORS</h4>
          <div className="space-y-1">
            <Link
              href="#"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <Thermometer size={16} />
              Temperature
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <Droplets size={16} />
              Humidity
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <Sun size={16} />
              Brightness
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <Wind size={16} />
              Soil Humidity
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <Gauge size={16} />
              CO2
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <Power size={16} />
              PH
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground px-2">SUPPORT</h4>
          <div className="space-y-1">
            <Link
              href="#"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <Settings size={16} />
              Settings
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              <Shield size={16} />
              Security
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

