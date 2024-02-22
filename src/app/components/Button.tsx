'use client'

import React from "react"

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined
    fullWidth?: boolean
    children?: React.ReactNode
    onClick?: () => void
    secondary?: boolean
    danger?: boolean
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
    
}) => {
    return (
        <div>
            Hello Button
        </div>
    )
}

export default Button