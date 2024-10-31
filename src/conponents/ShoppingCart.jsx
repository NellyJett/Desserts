import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ShoppingCart = ({ cart = [], onDelete, cartContainer, onConfirmOrder }) => {
  const getTotalAmount = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={`bg-white shadow-lg rounded-md p-4 ${cartContainer} flex flex-col`}>
      {/* Shopping Cart */}
      <div className="group-1">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        <div className='active:scrollbar-thumb-sky-400 max-h-[300px] scrollbar-thumb-slate-500 scrollbar-thin overflow-y-scroll'>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <span className="font-semibold">{item.name}</span>
                    <div className="flex items-center gap-x-32 w-full ">
                      <div className="text-gray-500 flex">
                        <span className="text-[#E28913]">Qty: {item.quantity}</span>
                        <span className="text-gray-300 pl-4">@</span> ${item.price.toFixed(2)}
                        <div className="font-semibold pl-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          className="ml-auto border px-2 rounded-full hover:bg-gray-200"
                          onClick={() => onDelete(item.id)}
                        >
                          <XMarkIcon className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Order Total Section */}
      <div className="order-2 flex justify-between items-center mt-10 font-bold pr-4">
        <span>Order Total:</span>
        <span>${getTotalAmount().toFixed(2)}</span>
      </div>

      {/* Carbon Neutral Delivery */}
      <div className="order-3 mt-8">
        <button className="w-full h-[50px] rounded-none bg-[#fff4e4] font-extralight">
          <span className="tree h-8 w-8"></span>
          <span>This is a carbon neutral delivery</span>
        </button>
        <div className="pt-6">
          <button
            className="w-full rounded-full h-[50px] bg-[#996515]"
            onClick={() => {
              if (cart.length > 0) {
                onConfirmOrder(); // Call the confirm order function
              }
            }}
          >
            {cart.length > 0 ? 'Confirm Order' : 'Start New Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

ShoppingCart.propTypes = {
  cart: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  cartContainer: PropTypes.string.isRequired,
  onConfirmOrder: PropTypes.func.isRequired,
};

export default ShoppingCart;
