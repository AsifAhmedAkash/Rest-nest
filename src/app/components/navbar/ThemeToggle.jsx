"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <Button
            isIconOnly
            variant="flat"
            size="sm"
            aria-label="Toggle theme"
            onPress={() => setTheme(isDark ? "light" : "dark")}
        >
            {isDark ? <Sun className="size-4 text-primary-container" /> : <Moon className="size-4" />}
        </Button>
    );
}