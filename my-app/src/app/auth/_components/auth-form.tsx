'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

export default function AuthForm() {

  const form = useForm()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Tornando a função assíncrona
  const handleSubmitAsync = async (data: any) => {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(false)

      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulando uma resposta bem-sucedida
      setSuccess(true)
    } catch (err) {
      setError('An error occurred while sending the magic link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your email to receive a magic link</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmitAsync)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...form.register('email')}
                />
              </div>
              {error && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle size={16} />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              {success && (
                <div className="text-sm text-green-600">
                  Magic link sent! Check your email inbox.
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Magic Link
              </>
            ) : (
              'Send Magic Link'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
