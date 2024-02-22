'use client'

import Button from "@/app/components/Button"
import Input from "@/app/components/Input"
import { useCallback, useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant === 'LOGIN') {
            // call login route
        } else {
            // call register route
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
                            label="Name"
                            register={register}
                            errors={errors}
                        />     
                    )}
                    <Input 
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                    />
                    <Input 
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                    />       
                </form>
                <Button>Test</Button>
            </div>
        </div>
    )
}

export default AuthForm