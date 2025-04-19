import * as z from 'zod';
import { m } from '$lib/paraglide/messages';

const HoursSchema = z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: m.hour_format_message()
});

const hoursToMin = (hour: string): number => {
    const [hours, minutes] = hour.split(":").map(Number);
    return hours * 60 + minutes;
};

export const BenchSchema = z.object({
    title: z.string().min(3).max(255),
    open_hours: HoursSchema,
    closing_hours: HoursSchema,
    location: z.object({
        lat: z.number(),
        lng: z.number()
    }),
    tags: z.array(z.object({
        slug: z.string(),
    }))
}).refine(
    (data) => hoursToMin(data.closing_hours) > hoursToMin(data.open_hours),
    {
        message: m.error_hours(),
        path: ["closing_hours"]
    }
);
