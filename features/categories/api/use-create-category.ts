import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>['json'];

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.categories.$post({ json: data });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Category created successfully");
            queryClient.invalidateQueries({ queryKey: ["categories"]}); //refetches categories every time a new category is created
        },
        onError: () => {
            toast.error("Something went wrong when creating category"); 
        },
    })

    return mutation;
}
