import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type LucideIcon, RefreshCcw } from "lucide-react"

interface SensorCardProps {
  title: string
  value: string
  subValue?: string
  icon: LucideIcon
  color: string
  onRefresh?: () => void
  onSettings?: () => void
}

export function SensorCard({ title, value, subValue, icon: Icon, color, onRefresh, onSettings }: SensorCardProps) {
  return (
    <Card className="bg-muted">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">{title}</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={onRefresh}
            >
              <RefreshCcw size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={onSettings}
            >
              <Icon size={16} />
            </Button>
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold" style={{ color }}>
            {value}
          </div>
          {subValue && <div className="text-sm text-muted-foreground">{subValue}</div>}
        </div>
      </div>
    </Card>
  )
}

