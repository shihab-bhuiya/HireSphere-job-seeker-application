
import {LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export function DashboardSideBar() {
  const navItems = [
    {icon: House, href: "/dashboard/recruiter", label: "Home"},
    {icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs"},
    {icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job"},
    {icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile"},
    {icon: Envelope, href: "/messages", label: "Messages"},
    {icon: Person, href: "/profile", label: "Profile"},
    {icon: Gear, href: "/settings", label: "Settings"},
  ];
  
  const NavContent =  <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                    href={item.href}
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>

  return (
  <>
  

    <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
      {NavContent}
      
     
    </aside>
  
    <Drawer>
      <Button className="lg:hidden" variant="secondary">
        <LayoutSideContentLeft />
      SideBar
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
             {NavContent}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  </>
  );
}