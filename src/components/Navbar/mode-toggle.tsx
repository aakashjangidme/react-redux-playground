import { mdiWhiteBalanceSunny, mdiLightbulbNightOutline } from '@mdi/js'
import Icon from '../Icon'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/store/theme/useTheme'

export function ModeToggle() {
    const { setAppTheme  } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Icon
                        path={mdiWhiteBalanceSunny}
                        // size={1}
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />

                    <Icon
                        path={mdiLightbulbNightOutline}
                        // size={1}
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    />

                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setAppTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAppTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAppTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
