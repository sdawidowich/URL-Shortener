import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { type ChildElement } from "~/types";

export function ConfirmDialog({open, setOpen, description, actionLabel, action, children}: {open?: boolean, setOpen?: (bool: boolean) => void, description: string, actionLabel: string, action: () => void, children?: ChildElement}) {
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={setOpen ? (() => setOpen(false)) : undefined}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={action}>{actionLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  );
}
