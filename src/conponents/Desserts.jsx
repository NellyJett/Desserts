import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import ShoppingCart from './ShoppingCart';
import { desserts } from './Product';

export const Desserts = () => {
    const [cart, setCart] = useState([]);

    // Add item or increase quantity in the cart
    const incrementQuantity = (item) => {
        setCart((prevCart) => {
            const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
            if (itemIndex !== -1) {
                // If item exists, increment its quantity
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // If item doesn't exist, add it with quantity 1
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    // Decrease item quantity or remove it if quantity reaches 0
    const decrementQuantity = (item) => {
        setCart((prevCart) => {
            const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
            if (itemIndex !== -1) {
                const updatedCart = prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                ).filter((cartItem) => cartItem.quantity > 0);
                return updatedCart;
            }
            return prevCart;
        });
    };

    // Check if item is in the cart
    const getItemQuantity = (id) => {
        const item = cart.find((cartItem) => cartItem.id === id);
        return item ? item.quantity : 0;
    };

    // Handle order confirmation
    const handleConfirmOrder = () => {
        if (cart.length > 0) {
            alert('Order confirmed! Thank you for your order.');
            setCart([]); 
        }
    };

    return (
        <div className="w-full pl-6 pr-6 mt-6 flex flex-col sm:flex-row gap-6  overflow-hidden">

            {/* Desserts Section */}
            <div className="place-content-center sm:w-[65%] ">
                <h1 className="font-extrabold mb-6 text-3xl">Desserts</h1>
                <div className="hover:scrollbar-thumb-sky-500 grid sm:grid-cols-3 grid-cols-1 w-full gap-4 pb-6 overflow-y-scroll max-h-[100vh]">
                    {desserts.map((dessert) => {
                        const quantity = getItemQuantity(dessert.id);
                        return (
                            <div key={dessert.id}>
                                <div className="relative">
                                    <div className={`${dessert.imgClass} p-4 min-h-[250px] relative rounded-[10px]`}/>
                                    <div className="justify-center absolute flex flex-col bottom-[-25px] transform -translate-x-1/2 left-1/2">
                                    {quantity > 0 ? (
                                        <button className="rounded-full border border-black-2 p-2 bg-white shadow-lg w-40 flex items-center justify-between gap-4 px-4"
                                            style={{ backgroundColor: '#E28913' }}>
                                            <span onClick={() => decrementQuantity(dessert)} className="cursor-pointer text-[#ffffff]">−</span>
                                            <span className="font-bold text-[#ffffff]">{quantity}</span>
                                            <span onClick={() => incrementQuantity(dessert)} className="cursor-pointer text-[#ffffff]">+</span>
                                        </button>
                                    ) : (
                                        // Add to Cart Button
                                        <button onClick={() => incrementQuantity(dessert)}
                                        className="rounded-full border border-black-2 p-2 bg-white shadow-lg w-40 flex items-center justify-center gap-2">
                                            <ShoppingCartIcon className="h-5 w-5" />
                                            Add to Cart
                                        </button>
                                    )}
                                    </div>

                                </div>
                                <div className="pt-6">
                                    <p className="mt-2 text-gray-400">{dessert.name.split(' ')[0]}</p>
                                    <p className="font-bold">{dessert.name}</p>
                                    <p className="text-[#E28913] font-bold">
                                        ${dessert.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Shopping Cart Section */}
            <ShoppingCart
                cart={cart}
                onDelete={(id) => setCart((prevCart) => prevCart.filter((item) => item.id !== id))}
                cartContainer="h-[600px] w-[97%] sm:w-[50%] md:w-[30%] lg:w-[35%] overflow-y-auto border border-gray-300 p-4"
                onConfirmOrder={handleConfirmOrder} // confirm order handler
            />
        </div>
    );
};

export default Desserts;
