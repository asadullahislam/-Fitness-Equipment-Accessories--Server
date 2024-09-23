import { z } from 'zod';

const categories = [
  'Cardio',
  'Strength',
  'Yoga',
  'Accessories',
  'Recovery',
] as const;
export type TProduct = {
  name: string;
  price: number;
  category: string[];
  description: string;
  quantity: number;
  image: string;
  // isDeleted?: boolean;
};

export interface TProductRequestBody {
  name?: string;
  price?: number;
  category?: string[];
  description?: string;
  quantity?: number;
  image?: string;
}

export const productValidationSchema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.array(z.enum(categories)),
  description: z.string(),
  quantity: z.number(),
  image: z.string().url({ message: 'Invalid image URL' }),

  // isDeleted: z.boolean().optional(),
});
