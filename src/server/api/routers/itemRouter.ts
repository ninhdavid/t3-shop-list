import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const itemRouter = createTRPCRouter({
	addItem: publicProcedure
		.input(
			z.object({
				name: z.string().min(1),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const item = await ctx.prisma.shoppingItem.create({ data: { name: input.name } });

			return item;
		}),
	getAllItems: publicProcedure.query(async ({ ctx }) => {
		const item = await ctx.prisma.shoppingItem.findMany();
		return item;
	}),
	deleteItem: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { id } = input;
			const item = await ctx.prisma.shoppingItem.delete({ where: { id } });
			return item;
		}),
	toggleChecked: publicProcedure
		.input(
			z.object({
				id: z.string(),
				checked: z.boolean(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { id, checked } = input;
			const item = await ctx.prisma.shoppingItem.update({
				where: { id },
				data: { checked: checked },
			});
			return item;
		}),
});
