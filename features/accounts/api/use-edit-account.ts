import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.accounts[':id']['$patch']>;
type RequestType = InferRequestType<typeof client.api.accounts[':id']['$patch']>['json'];

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.accounts[':id'].$patch({ json: data, param: { id } });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Account updated successfully");
            queryClient.invalidateQueries({ queryKey: ['account', { id }] });
            queryClient.invalidateQueries({ queryKey: ["accounts"]}); //refetches accounts every time a new account is created
            // TODO also invalidate summary and transactions
        },
        onError: () => {
            toast.error("Something went wrong when updating account"); 
        },
    })

    return mutation;
}
