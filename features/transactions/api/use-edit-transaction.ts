import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.transactions[':id']['$patch']>;
type RequestType = InferRequestType<typeof client.api.transactions[':id']['$patch']>['json'];

export const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.transactions[':id'].$patch({ json: data, param: { id } });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Transaction updated successfully");
            queryClient.invalidateQueries({ queryKey: ['transaction', { id }] });
            queryClient.invalidateQueries({ queryKey: ["transactions"]}); //refetches accounts every time a new account is created
            // TODO also invalidate summarY
        },
        onError: () => {
            toast.error("Something went wrong when updating transaction"); 
        },
    })

    return mutation;
}
