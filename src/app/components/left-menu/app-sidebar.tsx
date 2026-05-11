"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {

    return (
        <Sidebar className="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center justify-center">
                        <Image
                            src="/next.svg"
                            loading="eager"
                            alt="Next.js Logo"
                            width={250}
                            height={250}
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarMenu>
                    <SidebarMenuItem key='1'>
                        <SidebarMenuButton
                            asChild
                            className="btn-custom"
                        >
                            <Link href='/dashboard'>
                                <span className="uppercase font-bold">dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem key='2'>
                        <SidebarMenuButton
                            asChild
                            className="btn-custom"
                        >
                            <Link href='/user/list'>
                                <span className="uppercase font-bold">usuários</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    )
}