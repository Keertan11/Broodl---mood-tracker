'use client'
import React from 'react'
import Button from './Button'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const CallToAction = () => {
    const {currentUser} = useAuth()
    if(currentUser){
        return (
            <div className='max-w-[600px] mx-auto'>
                <Link href={'/dashboard'}>
                    <Button text='Go To Dashboard' full dark/>
                </Link>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
            <Link href={'/dashboard'}>
                <Button text='Sign Up' />
            </Link>
            <Link href={'/dashboard'}>
                <Button text='Login' dark />
            </Link>
        </div>
    )
}

export default CallToAction
