import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

const LeftMenu = () => {
  return (
      <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
      </SidebarProvider>
  )
}

export default LeftMenu