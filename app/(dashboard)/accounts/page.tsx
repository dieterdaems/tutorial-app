"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Plus } from "lucide-react";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/data-table";

const AccountsPage = () => {
    const newAccount = useNewAccount();

    const data: Payment[] = [
        {
          id: "728ed52f",
          amount: 100,
          status: "pending",
          email: "m@example.com",
        },
            {
              id: "728ed5s2f",
              amount: 100,
              status: "pending",
              email: "ddd@example.com",
            },
        // ...
      ]


    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 lg:pl-10 lg:pr-10">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts
                    </CardTitle>
                    <Button size="sm" onClick={newAccount.onOpen}>
                        <Plus className="size-4 mr-2" />
                        Add Account
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        onDelete={() => {}}
                        columns={columns}
                        data={data}
                        filterKey="email
                        " />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage;
