"use client"

import { PRODUCT_CATEGORIES } from "@/config";
import { useRef, useState } from "react"
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export default function NavItems() {
    const [activeIndex, setActiveIndex] = useState<null | number>(null);

    const isAnyOpen  = activeIndex !== null  // means a user has selected one category

    //close navbar menu when user clicks outside the navbar
    const navRef = useRef<HTMLDivElement | null>(null)

    // from hooks/use-on-click-outside.ts >> takes in the ref element and function to execute
    useOnClickOutside(navRef, ()=>setActiveIndex(null)) 

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
        {
          PRODUCT_CATEGORIES.map((category, i) => {

            // keep track of what item is active(clicked) on the NavBar
            const handleOpen = () => {
              if (activeIndex === i) {
                setActiveIndex(null)  //close the menu if clicked again
              } else {
                setActiveIndex(i)
              }
            }

            const isOpen = i === activeIndex  //boolean

            return(
              <NavItem
                category={category}
                handleOpen={handleOpen}
                isOpen={isOpen}
                key={category.value}
                isAnyOpen={isAnyOpen}
              />
            )
          })
        }
    </div>
  )
}
