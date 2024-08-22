import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.categories[':id']['$delete']>;

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.categories[':id'].$delete({ param: { id } });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['category', { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"]});
            queryClient.invalidateQueries({ queryKey: ["transactions"]}); //refetches categories every time a new category is created
            // TODO also invalidate summary and transactions
        },
        onError: () => {
            toast.error("Something went wrong when deleting category"); 
        },
    })

    return mutation;
}
