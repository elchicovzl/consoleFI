import getCurrentUser from '@/actions/getCurrentUser';
import Container from '@/components/Container';
import Logo from '@/components/nav/Logo';
import { MainNav } from '@/components/nav/MainNav';
import  UserNav  from '@/components/nav/UserNav';
import { SiteFooter } from '@/components/site-footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Frontera Dashboard',
    description: 'Dashboard de frontera inmobiliaria',
}

export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const user = await getCurrentUser();

    if (!user) {
        return null
    }

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="py-4 border-b">
                    <Container>
                        <div className="flex h-16 items-center">
                            <Logo />
                            <MainNav className="mx-6" />
                            <div className="ml-auto flex items-center space-x-4">
                                <UserNav user={user} />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <div className='mt-4 pb-10'>
                <Container>
                    {children}
                </Container>
            </div>
            <SiteFooter />
            
        </>
  )
}