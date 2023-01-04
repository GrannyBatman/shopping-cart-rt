import { createContext, useContext, ReactNode, useState } from 'react'
import { ShoppingCart } from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
	children: ReactNode
}

type ShoppingCartContextProps = {
	openCart: () => void
	closeCart: () => void
	cartQuantity: number
	getItemQuantity: (id: number) => number
	increaseCartQuantity: (id: number) => void
	decreaseQuantity: (id: number) => void
	removeFromCart: (id: number) => void
	cartItems: CartItem[]
}

export type CartItem = {
	id: number
	quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export function useShoppingCart() {
	return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
		'shopping-cart',
		[]
	)
	const [isOpen, setIsOpen] = useState(false)

	const getItemQuantity = (id: number) => {
		return cartItems.find(i => i.id === id)?.quantity || 0
	}

	const removeFromCart = (id: number) => {
		setCartItems(items => items.filter(i => i.id !== id))
	}

	const cartQuantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)

	const increaseCartQuantity = (id: number) => {
		setCartItems(items => {
			if (items.find(i => i.id === id) == undefined) {
				return [...items, { id, quantity: 1 }]
			} else {
				return items.map(item =>
					item.id !== id ? item : { ...item, quantity: item.quantity + 1 }
				)
			}
		})
	}

	const decreaseQuantity = (id: number) => {
		setCartItems(items => {
			if (items.find(i => i.id === id)?.quantity === 1) {
				return items.filter(item => item.id !== id)
			} else {
				return items.map(item =>
					item.id !== id ? item : { ...item, quantity: item.quantity - 1 }
				)
			}
		})
	}

	const openCart = () => setIsOpen(true)
	const closeCart = () => setIsOpen(false)

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				cartQuantity,
				increaseCartQuantity,
				decreaseQuantity,
				removeFromCart,
				openCart,
				closeCart,
				cartItems,
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	)
}
