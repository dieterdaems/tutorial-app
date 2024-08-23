"use client"

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
 } from "@radix-ui/react-dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transactions";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
    id: string;
}

export const Actions = ( {id}: Props) => {
    const [Confirmdialog, confirm] = useConfirm(
        'Are you sure?',
        'This action cannot be undone',
    );

    const deleteMutation = useDeleteTransaction(id);
    const { onOpen } = useOpenTransaction();

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
                    className="flex flex-row p-2 bg-white hover:text-white hover:bg-black cursor-pointer"
                    disabled={deleteMutation.isPending}
                    onClick={() => onOpen(id)}>
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    className="flex flex-row p-2 bg-white hover:text-white hover:bg-black cursor-pointer"
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