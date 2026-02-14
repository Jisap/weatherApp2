

import { Logo } from "@/assets/Logo"
import { SearchDialog } from "./SearchDialog"
import { ThemeDropdown } from "./ThemeDropdown"
import { UnitDropdown } from "./UnitDropdown"

export const TopAppBar = () => {
  return (
    <div className="h-16 lg:my-4 ">
      <header className="h-16 px-4 flex items-center justify-between fixed top-0 left-0 w-full bg-background/50 backdrop-blur-lg border-b z-50 
      lg:border lg:rounded-2xl lg:w-auto lg:max-w-384 lg:mx-auto lg:top-4 lg:left-4 lg:right-4"
      >
        <Logo />
        <div className="flex gap-2">
          <SearchDialog />
          <div className="flex gap-2">
            <ThemeDropdown />
            <UnitDropdown />
          </div>
        </div>
      </header>
    </div>
  )

}