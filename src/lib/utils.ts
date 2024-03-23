import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// CUSTOME MADE FOR CURRENCY EDITING 
export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT" | "KES",
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { currency = "USD", notation = "compact" } = options

  // check price value if string and change to number/float
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: notation,
    maximumFractionDigits: 2
  }).format(numericPrice)
}