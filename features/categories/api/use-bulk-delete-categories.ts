import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>['json'];

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.categories["bulk-delete"].$post({ json: data });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Categories deleted");
            queryClient.invalidateQueries({ queryKey: ["categories"]}); //refetches categories every time a new category is created
            // TODO also invalidate summary
        },
        onError: () => {
            toast.error("Something went wrong when deleting categories"); 
        },
    })

    return mutation;
}
