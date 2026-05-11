"use client"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { User } from 'lucide-react';

const Dashboard = () => {

  const router = useRouter()

  return (
    <div className='page'>
      <div className="grid grid-cols-5 gap-4">
        <Card
          key='userList'
          className="card-button cursor-pointer hover:bg-accent transition-colors"
          onClick={() => router.push(`/user/list`)}
        >
          <CardContent className="flex items-center justify-center p-3 h-20">
            <span className="flex items-center gap-2">
              <User />
              USUARIOS
            </span>
          </CardContent>
        </Card>
      </div>  
    </div>
  )
}

export default Dashboard