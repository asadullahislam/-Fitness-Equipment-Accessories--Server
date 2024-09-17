import { z } from 'zod';

export type TProduct = {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  image: string;
  isDeleted?: boolean;
};

export interface TProductRequestBody {
  name?: string;
  price?: number;
  category?: string;
  description?: string;
  quantity?: number;
  image?: string;
}

export const productValidationSchema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
  quantity: z.number(),
  image: z.string(),
  isDeleted: z.boolean().optional(),
});
