import { MainNav } from '@/components/nav/MainNav';
import Container from "./Container"
import Logo from "./nav/Logo"
import { UserNav } from "./nav/UserNav"

export function SiteHeader() {
  return (
    <div className="hidden flex-col md:flex">
          <div className="py-4 border-b">
              <Container>
                  <div className="flex h-16 items-center">
                      <Logo />
                      <MainNav className="mx-6" />
                      <div className="ml-auto flex items-center space-x-4">
                          <UserNav />
                      </div>
                  </div>
              </Container>
          </div>
      </div>
  )
}
