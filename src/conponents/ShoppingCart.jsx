import { XMarkIcon } from '@heroicons/react/24/outline';

const ShoppingCart = ({ cart, onDelete, cartContainer, onConfirmOrder }) => {
  // Calculate the total amount of the cart
  const getTotalAmount = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={`bg-white shadow-lg rounded-md p-4 ${cartContainer}`}>
      <h2 className="text-xl font-bold mb-4">Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <span className="font-semibold">{item.name}</span>
                  <div className="flex justify-between items-center gap-36">
                    <div className="text-gray-500 flex">
                      <span className="text-[#E28913]">Qty: {item.quantity}</span>
                      <span className="text-gray-300 pl-4">@</span> ${item.price.toFixed(2)}
                      <div className="font-semibold pl-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        className="border px-2 rounded-full hover:bg-gray-200"
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

          {/* Order Total Section */}
          <div className="flex justify-between items-center mt-4 font-bold">
            <span>Order Total:</span>
            <span>${getTotalAmount().toFixed(2)}</span>
          </div>
        </>
      )}

      {/* Carbon Neutral Delivery */}
      <div className="mt-40">
        <div>
          <button className="w-full h-[50px] rounded-none bg-[#fff4e4] font-extralight">
            <span className="tree h-8 w-8"></span>
            <span>This is a carbon neutral delivery</span>
          </button>
        </div>

        {/* Confirm Order / Start New Order Button */}
        <div className="pt-6">
          <button
            className="w-full rounded-full h-[50px] bg-[#996515]"
            onClick={() => {
              if (cart.length > 0) {
                onConfirmOrder(); // Call the confirm order function
              } else {
                // Optionally handle the "start new order" scenario here
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

export default ShoppingCart;
