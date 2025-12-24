import * as React from "react"
import { cn } from "@/utils"

const Slider = React.forwardRef(({ className, value = [0], onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
  const handleChange = (e) => {
    const newValue = [Number(e.target.value)]
    onValueChange?.(newValue)
  }

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)} ref={ref}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider-thumb"
        {...props}
      />
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
        }
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
})
Slider.displayName = "Slider"

export { Slider }