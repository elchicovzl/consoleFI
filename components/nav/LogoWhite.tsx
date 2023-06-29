'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import img from '@/public/images/logoblanco.png';

const LogoWhite = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push('/')}
            alt="logo white"
            className='hidden md:block cursor-pointer'
            height="75"
            width="75"
            src={img}
        />
    )
}

export default LogoWhite;