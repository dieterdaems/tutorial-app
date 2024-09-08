import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { convertAmountFromMiliUnits } from "@/lib/utils";

export const useGetTransaction= (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["transaction", { id }],
        queryFn: async () => {
            const reponse = await client.api.transactions[':id'].$get( { param: { id } });

            if (!reponse.ok) {
                throw new Error("Failed to fetch transaction");
            }

            const { data } = await reponse.json();
            return {
                ...data,
                amount: convertAmountFromMiliUnits(data.amount),
            };
        } ,
    })
    return query;
}