import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Essential Heavyweight Hoodie',
    price: 2500,
    image: '/images/blank-hoodie.jpg',
    description: '100% heavy-weight cotton, relaxed fit, pre-shrunk, double-stitched seams for durability'
  },
  {
    id: 2,
    name: 'Classic Blank Tee',
    price: 1200,
    image: '/images/blank-tee.jpg',
    description: 'Premium combed-ring spun cotton, shoulder-to-shoulder taping, retail fit for everyday wear'
  },
  {
    id: 3,
    name: 'Everyday Sweatpants',
    price: 1800,
    image: '/images/sweatpants.jpg',
    description: '80% cotton / 20% polyester blend, elastic waistband with drawstring, tapered leg design'
  },
  {
    id: 4,
    name: 'Long Sleeve Basic Top',
    price: 1500,
    image: '/images/longsleeve.jpg',
    description: '100% combed and ring-spun cotton, side-seamed construction, unisex fit'
  },
  {
    id: 5,
    name: 'Heavyweight Fleece Jacket',
    price: 3200,
    image: '/images/fleece.jpg',
    description: '12oz heavyweight fleece, anti-pill finish, two-way front zipper, multiple pockets'
  },
  {
    id: 6,
    name: 'Premium Jogger Set',
    price: 3500,
    image: '/images/joggerset.jpg',
    description: 'Matching hoodie and jogger set, brushed fleece interior, ribbed cuffs and hem'
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if item already in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        // Decrease quantity
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        // Remove item completely
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const proceedToCheckout = () => {
    setCartOpen(false);
    setCheckoutModalOpen(true);
  };

  const closeCheckoutModal = () => {
    setCheckoutModalOpen(false);
  };

  const openModal = (title, content) => {
    setModalContent({ title, content });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight">Seekon Apparel</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={openCart}
                className="p-2 rounded hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.737 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Everyday Essentials
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Independent quality streetwear crafted for the modern individual.
            Simple designs, premium materials—no logos, no compromises.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    KES {product.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 ${cartOpen ? 'block' : 'hidden'}`}>
        <div className="w-full max-w-xs bg-white p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button onClick={closeCart} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">KES {item.price.toLocaleString()} x {item.quantity}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <div className="pt-4 border-t">
                <p className="font-bold text-right">Subtotal: KES {getCartTotal().toLocaleString()}</p>
                <button 
                  onClick={proceedToCheckout}
                  className="w-full mt-3 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${checkoutModalOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Checkout
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Our payment gateway is currently undergoing scheduled maintenance. 
            Please try your purchase again in 24 hours.
          </p>
          <button 
            onClick={closeCheckoutModal}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Policy Modals */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${modalContent.title ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-lg p-8 w-full max-w-md">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">{modalContent.title}</h2>
            <button onClick={() => setModalContent({ title: '', content: '' })} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="prose prose-sm text-gray-700">
            {modalContent.content}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Seekon Apparel</h3>
              <p className="text-gray-600 space-y-2">
                Quality streetwear essentials designed for comfort and durability.
                No logos, no compromises—just premium basics.
              </p>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <p className="text-gray-600 space-y-2">
                <span className="block">Physical Address: KFC drive way Thika rd kahawa sukari, NAIROBI, 00100, Kiambu County, Kenya</span>
                <span className="block">Phone: +254 727 672 772</span>
                <span className="block">Email: muturinick8@gmail.com</span>
              </p>
            </div>
            
            {/* Policies */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Policies</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => openModal(
                    'Refund Policy', 
                    'We offer a 30-day return policy on all unworn items with original tags. Refunds are processed to the original payment method within 5-7 business days after we receive the returned item.'
                  )} 
                  className="w-full text-left text-gray-600 hover:underline"
                >
                  Refund Policy
                </button>
                <button 
                  onClick={() => openModal(
                    'Shipping Info', 
                    'We ship worldwide via trusted carriers. Standard delivery takes 5-10 business days. Free shipping on orders over KES 5,000. Tracking information is provided for all orders.'
                  )} 
                  className="w-full text-left text-gray-600 hover:underline"
                >
                  Shipping Info
                </button>
                <button 
                  onClick={() => openModal(
                    'Terms of Service', 
                    'By purchasing from Seekon Apparel, you agree to our terms of service. All items are sold as described. We reserve the right to modify prices and availability without notice. For complete terms, please contact our customer service.'
                  )} 
                  className="w-full text-left text-gray-600 hover:underline"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Seekon Apparel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;