import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transactions";

import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type Props = {
    id: string;
    category: string | null;
    categoryId: string | null;
}

export const CategoryColumn = ({ id, category, categoryId }: Props) => {
    const { onOpen: onOpencategory } = useOpenCategory();
    const { onOpen: onOpenTransaction } = useOpenTransaction();

    const onClick = () => {
        if (categoryId) onOpencategory(categoryId);
        else onOpenTransaction(id);
    }
    return (
        <div className={cn("flex items-center cursor-pointer hover:underline",
                             !category && 'text-rose-500')}
            onClick={onClick}>
            {!category && (<TriangleAlert className="mr-2 size-4 shrink-0" />)}
            {category || 'Uncategorized'}
        </div>
    )
}