import * as React from "react"
import { cn } from "@/utils"

const RadioGroupContext = React.createContext()

const RadioGroup = ({ value, onValueChange, className, children, ...props }) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className={cn("grid gap-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

const RadioGroupItem = React.forwardRef(({ className, value, id, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext)
  const isChecked = context.value === value

  return (
    <input
      ref={ref}
      type="radio"
      id={id}
      checked={isChecked}
      onChange={() => context.onValueChange(value)}
      className={cn("peer", className)}
      data-state={isChecked ? "checked" : "unchecked"}
      {...props}
    />
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }