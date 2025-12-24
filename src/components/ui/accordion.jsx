import * as React from "react"
import { cn } from "@/utils"

const AccordionContext = React.createContext()

const Accordion = ({ type = "single", collapsible = false, value, onValueChange, className, children, ...props }) => {
  const [openItems, setOpenItems] = React.useState(value || (type === "single" ? "" : []))

  const handleValueChange = (itemValue) => {
    if (type === "single") {
      const newValue = collapsible && openItems === itemValue ? "" : itemValue
      setOpenItems(newValue)
      onValueChange?.(newValue)
    } else {
      const newValue = openItems.includes(itemValue)
        ? openItems.filter(v => v !== itemValue)
        : [...openItems, itemValue]
      setOpenItems(newValue)
      onValueChange?.(newValue)
    }
  }

  return (
    <AccordionContext.Provider value={{ openItems, onValueChange: handleValueChange, type }}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItemBase = React.forwardRef(({ className, value, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props}>
      {children}
    </div>
  )
})
AccordionItemBase.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  const isOpen = context.type === "single" 
    ? context.openItems === item 
    : context.openItems.includes(item)

  return (
    <button
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      onClick={() => context.onValueChange(item)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionItemContext = React.createContext()

const AccordionItemWrapper = ({ value, children, ...props }) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <AccordionItemBase value={value} {...props}>
        {children}
      </AccordionItemBase>
    </AccordionItemContext.Provider>
  )
}

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  const isOpen = context.type === "single" 
    ? context.openItems === item 
    : context.openItems.includes(item)

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden text-sm transition-all", className)}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

const AccordionItem = AccordionItemWrapper
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }