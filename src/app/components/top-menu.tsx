"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthService } from '../services/login/authService'

const TopMenu = () => {

    const router = useRouter();

    async function handleLogOut() {
        await AuthService.logout().then((response) => {
            if(response) {
                router.replace('/login')
            }
        }).catch((error) => {
            console.error('Login failed:', error)
        })
    }

    return (
        <header>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full flex flex-col justify-center">
                    <Avatar>
                        <AvatarImage src="/avatar_guilherme.jpg" alt="shadcn" />
                        <AvatarFallback>GUI</AvatarFallback>
                    </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32">
                    <DropdownMenuGroup>
                        <Link href="/profile">
                            <DropdownMenuItem className='background-transparent'>
                                Perfil
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={handleLogOut} className='background-transparent' variant="destructive">
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}

export default TopMenu