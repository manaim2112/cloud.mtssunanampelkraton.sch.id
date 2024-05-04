import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { getAuthorizeGuest } from "@/helper/getAuthorizeGuest";
import { Home, LineChart, QrCode, Settings, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface RefreshToken {
    id : number;
    nisn:string;
    pass:string;
    name:string;
    kelas:string;
    ruang:string;
    sesi:string;
    photo:string;
    created_at:string;
}
export default function Sidebar() {
  const path = useLocation();
  const [user, setUser] = useState<RefreshToken>();
  useEffect(() => {
    return setUser(getAuthorizeGuest());
  }, []);
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="http://yami.my.id"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <QrCode className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/guest/" + user?.nisn}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  path.pathname == "/dashboard"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/guest/" + user?.nisn + "/test"}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  path.pathname.startsWith("/dashboard/users")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">UJIAN</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">UJIAN</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/analisis"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  path.pathname.startsWith("/dashboard/analisis")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analisis</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analisis</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
