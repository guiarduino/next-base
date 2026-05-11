"use client"

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { AuthService } from '../../services/login/authService'
import { useRouter } from 'next/navigation'
import { Spinner } from "@/components/ui/spinner"
import Image from "next/image"
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';

const Page = () => {

  const router = useRouter()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false)

  async function handleLogin() {
    setLoginButtonDisabled(true)
    await AuthService.login(user, password).then((result) => {
      if(result) {
        router.replace('/dashboard')
      }
    }).catch((error) => {
      console.error('Login failed:', error)
      setLoginButtonDisabled(false)
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={394}
        height={80}
        priority
        style={{ width: 200, height: 'auto' }}
      />
      <Card className="black w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldSet disabled={loginButtonDisabled} className="w-full">
              <FieldGroup className="grid grid-cols-1 gap-4">
                <Field key='user' className="flex-1 min-w-[200px]">
                  <FieldLabel htmlFor='user'>Usuario</FieldLabel>
                  <Input
                    id="user"
                    type="user"
                    placeholder="m@example.com"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </Field>
                <Field key='password' className="flex-1 min-w-[200px]">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <Button
                      onClick={(e) => loginButtonDisabled && e.preventDefault()}
                      className={`ml-auto bg-withe text-black inline-block text-sm underline-offset-4 hover:underline ${
                        loginButtonDisabled ? 'pointer-events-none opacity-50' : ''
                      }`}
                    >
                      Forgot your password?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleLogin} disabled={ loginButtonDisabled }>
            Entrar
            {loginButtonDisabled && (
              <Spinner data-icon="inline-start" />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )

}

export default Page