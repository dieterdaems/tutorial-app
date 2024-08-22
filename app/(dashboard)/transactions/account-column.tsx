import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";

import { cn } from "@/lib/utils";

type Props = {
    account: string;
    accountId: string;
}

export const AccountColumn = ({ account, accountId }: Props) => {
    const { onOpen: onOpenaccount } = useOpenAccount();

    const onClick = () => {
            onOpenaccount(accountId);
    }
    return (
        <div className="flex items-center cursor-pointer hover:underline"
            onClick={onClick}>
            {account}
        </div>
    )
}