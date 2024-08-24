"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { Loader2, Plus } from "lucide-react";
import { columns} from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transaction";
import { UploadButton } from "./upload-button";
import { useState } from "react";
import { ImportCard } from "./import-card";

enum VARIANTS {
    LIST = 'LIST',
    IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {}
}

const TransactionsPage = () => {
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setVariant(VARIANTS.IMPORT);
        setImportResults(results);
        // console.log(variant);
    }

    const onCancelImport = () => {
        setVariant(VARIANTS.LIST);
        setImportResults(INITIAL_IMPORT_RESULTS);
    }


    const newTransaction = useNewTransaction();
    const transactionsQuery = useGetTransactions();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactions =transactionsQuery.data || [];

    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

    if (transactionsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 lg:pl-10 lg:pr-10">
            <Card className="border-none drop-shadow-sm">
                <CardHeader>
                    <Skeleton className="h-8 w-48"/>
                </CardHeader>
                <CardContent>
                    <div className="h-[500px] w-full flex items-center justify-center">
                        <Loader2 className="size-6  text-slate-300 animate-spin" />
                    </div>
                </CardContent>
            </Card>
            </div>
        )
    }

    if (variant === VARIANTS.IMPORT) {
        return (
        <>
        <ImportCard
            data={importResults.data}
            onCancel={onCancelImport}
            onSubmit={() => {}}
        />
        </>
        )
    }




    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 lg:pl-10 lg:pr-10">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transactions History
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                    <Button size="sm" onClick={newTransaction.onOpen} className="w-full lg:w-auto">
                        <Plus className="size-4 mr-2" />
                        Add Transaction
                    </Button>
                    <UploadButton 
                        onUpload={onUpload}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteTransactions.mutate({ ids });
                        }}
                        columns={columns}
                        data={transactions}
                        filterKey="payee"
                        disabled={isDisabled} />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionsPage;
