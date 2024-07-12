"use client"

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
 } from "@radix-ui/react-dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
    id: string;
}

export const Actions = ( {id}: Props) => {
    const [Confirmdialog, confirm] = useConfirm(
        'Are you sure?',
        'This action cannot be undone',
    );

    const deleteMutation = useDeleteAccount(id);
    const { onOpen } = useOpenAccount();

    const onDelete = async () => {
        const confirmed = await confirm();

        if (confirmed) {
            deleteMutation.mutate();
        }
    }

    return (
        <>
            <Confirmdialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                    disabled={deleteMutation.isPending}
                    onClick={() => onOpen(id)}>
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    disabled={deleteMutation.isPending}
                    onClick={onDelete}>
                        <Trash className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}