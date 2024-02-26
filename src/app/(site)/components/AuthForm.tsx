'use client'

import axios from "axios"

import Button from "@/app/components/Button"
import Input from "@/app/components/Input"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast"


type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (session.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        setIsLoading(true)

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
        } else if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials')
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                    router.push('/users')
                }

            })
            .finally(() => setIsLoading(false))
        }
    }

    const socialActions = (action: string) => {
        setIsLoading(true)

        // NextAuth Social SignIn
    }

    return (
        <div className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
        ">
            <div className="
                bg-white
                px-4
                py-8
                shadow
                sm:rounded-lg
                sm:px-10
            ">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input 
                            id="name"
                            label="Nome"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />     
                    )}
                    <Input 
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input 
                        id="password"
                        label="Senha"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Entrar' : 'Cadastrar'}
                        </Button>
                    </div>       
                </form>
                <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                ">
                    <div>
                        {variant === 'LOGIN' ? 'Ainda não possui conta?' : 'Já possui conta?'}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? 'Criar uma conta' : 'Fazer login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm