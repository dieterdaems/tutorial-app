import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>['json'];

export const useBulkCreateTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.transactions["bulk-create"].$post({ json: data });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Transactions created");
            queryClient.invalidateQueries({ queryKey: ["transactions"]}); //refetches accounts every time a new account is created
            // TODO also invalidate summary
        },
        onError: () => {
            toast.error("Something went wrong when creating transactions"); 
        },
    })

    return mutation;
}
