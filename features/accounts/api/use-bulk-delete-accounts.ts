import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>['json'];

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.accounts["bulk-delete"].$post({ json: data });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Accounts deleted");
            queryClient.invalidateQueries({ queryKey: ["accounts"]}); //refetches accounts every time a new account is created
            // TODO also invalidate summary
        },
        onError: () => {
            toast.error("Something went wrong when deleting accounts"); 
        },
    })

    return mutation;
}
