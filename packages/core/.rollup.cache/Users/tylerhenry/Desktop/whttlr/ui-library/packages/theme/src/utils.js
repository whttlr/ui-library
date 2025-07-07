import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function formatters() {
    return {
        currency: (value) => new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value),
        number: (value, decimals = 2) => new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value),
        percentage: (value) => new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
        }).format(value / 100),
        coordinate: (value) => new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
            signDisplay: 'always',
        }).format(value),
    };
}
//# sourceMappingURL=utils.js.map