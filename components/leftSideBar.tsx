import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LeftSideBar = () => {
    return (
        <section className='left_sidebar'>
            <nav className='flex flex-col gap-6'>
                <Link
                    className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'
                    href="/">
                    <Image
                        src="/icons/logo.svg"
                        alt='logo'
                        width={23}
                        height={27}
                    />
                    <h1 className='text-24 font-extrabold text-white max-lg:hidden'>Podcastr</h1>
                </Link>

                {
                    sidebarLinks.map(({ route, label, imgURL }) => {
                        return <Link
                            key={label}
                            href={route}
                            className='flex gap-3 items-center py-4 max-lg:px-4 
                            justify-start' /* justify-center lg: */
                        >
                            <Image
                                src={imgURL}
                                alt={label}
                                width={24}
                                height={24}
                            />
                            <p>
                                {label}
                            </p>
                        </Link>
                    })
                }
            </nav>
        </section>
    )
}

export default LeftSideBar