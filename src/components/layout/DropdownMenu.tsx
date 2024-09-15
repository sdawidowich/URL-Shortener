"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { useState } from "react"

const historyLengths = [
    {
        value: 1,
        label: "Last 24 Hours",
    },
    {
        value: 7,
        label: "Last 7 Days",
    },
    {
        value: 30,
        label: "Last 30 Days",
    },
    {
        value: 180,
        label: "Last 6 Months",
    }
]

export function DropdownMenu({value, setValue}: {value: number, setValue: (val: number) => void}) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {
                        value
                        ? 
                            historyLengths.find((framework) => framework.value === value)?.label
                        : 
                            "Select history length..."
                    }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {
                                historyLengths.map((length) => (
                                    <CommandItem key={length.value} value={length.value.toString()} onSelect={() => {
                                            setValue(length.value);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check className={cn("mr-2 h-4 w-4", value === length.value ? "opacity-100" : "opacity-0",)}/>
                                        {length.label}
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}