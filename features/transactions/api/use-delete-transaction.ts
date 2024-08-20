import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.transactions[':id']['$delete']>;

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.transactions[':id'].$delete({ param: { id } });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Transaction deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['transaction', { id }] });
            queryClient.invalidateQueries({ queryKey: ["transactions"]}); //refetches accounts every time a new account is created
            // TODO also invalidate summary and transactions
        },
        onError: () => {
            toast.error("Something went wrong when deleting transaction"); 
        },
    })

    return mutation;
}
