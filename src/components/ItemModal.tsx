import { api } from '@/utils/api';
import type { ShoppingItem } from '@prisma/client';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ItemModalProps {
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
}

// eslint-disable-next-line no-empty-pattern
const ItemModal: FC<ItemModalProps> = ({ setModalOpen, setItems }) => {
	const [input, setInput] = useState<string>('');
	// const { mutate: addItem } = api.items.addItem.useMutation();
	const mutation = api.items.addItem.useMutation({
		onSuccess(shoppingItem) {
			setItems((prev) => [...prev, shoppingItem]);
		},
	});

	return (
		<div className='absolute inset-0 flex items-center justify-center bg-black/75'>
			<div className='space-y-4 bg-white p-3'>
				<h3 className='text-xl font-semibold '>Name of Item</h3>
				<input
					type='text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className='w-full rounded-md bg-gray-300 shadow-sm focus:border-violet-300 focus:ring'
				/>
				<div className='grid grid-cols-2 gap-8'>
					<button
						type='button'
						onClick={() => setModalOpen(false)}
						className='transitions rounded-md bg-gray-500 p-2 text-xs text-white hover:bg-gray-600'
					>
						Cancel
					</button>
					<button
						type='button'
						onClick={() => {
							mutation.mutate({ name: input });
							setModalOpen(false);
						}}
						// onClick={() => addItem({ name: input })}
						className='transitions rounded-md bg-violet-500 p-2 text-xs text-white hover:bg-violet-600'
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};

export default ItemModal;
