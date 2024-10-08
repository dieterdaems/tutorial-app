import CurrencyInput from 'react-currency-input-field';
import {
    Info,
    MinusCircle,
    PlusCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { 
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from '@/components/ui/tooltip';

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    disabled?: boolean;
    placeholder?: string;
};

export const AmountInput = ({
    value,
    onChange,
    disabled,
    placeholder,
}: Props) => {
    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpense = parsedValue < 0;

    const onReverseValue = () => {
        if (!value) return;
        onChange((parsedValue * -1).toString());
    }

    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            className={cn(
                                "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-s-md p-2 flex items-center justify-center transition",
                                isIncome && "bg-emerald-500 hover:bg-emerald-600" ,
                                isExpense && "bg-rose-500 hover:bg-rose-600" ,
                            )}
                            onClick={onReverseValue}
                        >
                            {!parsedValue && (<Info className="size-3 text-white" />)}
                            {isIncome  && (<PlusCircle className="size-3 text-white" />)}
                            {isExpense && (<MinusCircle className="size-3 text-white" />)}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>use [+] for income and [-] for expenses</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CurrencyInput
                prefix='€'
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                value={value}
                onValueChange={onChange}
                disabled={disabled}
                decimalsLimit={2}
                decimalScale={2}
                />
            <p className='text-xs text-muted-foreground mt-2'>
                {isIncome && 'This will count as income'}
                {isExpense && 'This will count as an expense'}
            </p>
        </div>
    )
}
