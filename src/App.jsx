import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Essential Heavyweight Hoodie',
    price: 2500,
    image: '/images/blank-hoodie.jpg',
    description: '100% heavy-weight cotton, relaxed fit, pre-shrunk, double-stitched seams for maximum durability and comfort.'
  },
  {
    id: 2,
    name: 'Classic Blank Tee',
    price: 1200,
    image: '/images/blank-tee.jpg',
    description: 'Premium combed ring-spun cotton, shoulder-to-shoulder taping, retail fit perfect for everyday wear.'
  },
  {
    id: 3,
    name: 'Everyday Sweatpants',
    price: 1800,
    image: '/images/sweatpants.jpg',
    description: '80% cotton / 20% polyester fleece blend, elastic waistband with drawstring, tapered leg for modern silhouette.'
  },
  {
    id: 4,
    name: 'Long Sleeve Basic Top',
    price: 1500,
    image: '/images/blank-tee.jpg',
    description: '100% combed and ring-spun cotton, side-seamed construction, versatile unisex fit for layering or solo wear.'
  },
  {
    id: 5,
    name: 'Heavyweight Fleece Jacket',
    price: 3200,
    image: '/images/blank-hoodie.jpg',
    description: '12oz heavyweight fleece with anti-pill finish, two-way front zipper, and multiple secure pockets for functionality.'
  },
  {
    id: 6,
    name: 'Premium Jogger Set',
    price: 3500,
    image: '/images/sweatpants.jpg',
    description: 'Matching hoodie and jogger set with brushed fleece interior, ribbed cuffs and hem for a polished athletic look.'
  },
  {
    id: 7,
    name: 'Vintage Washed Tee',
    price: 1400,
    image: '/images/blank-tee.jpg',
    description: 'Garment-dyed cotton with a soft vintage feel, pre-shrunk fabric that maintains fit after repeated washes.'
  },
  {
    id: 8,
    name: 'Urban Cargo Pants',
    price: 2200,
    image: '/images/sweatpants.jpg',
    description: 'Durable cotton twill with multiple cargo pockets, relaxed fit with tapered ankle, reinforced stitching.'
  },
  {
    id: 9,
    name: 'Oversized Hoodie',
    price: 2800,
    image: '/images/blank-hoodie.jpg',
    description: 'Boxy oversized fit with dropped shoulders, premium fleece interior, kangaroo pocket, ribbed hem and cuffs.'
  },
  {
    id: 10,
    name: 'Basic Cap',
    price: 900,
    image: '/images/blank-tee.jpg',
    description: 'Structured 6-panel cotton twill cap with adjustable strap, embroidered eyelets, and curved brim for a classic look.'
  },
  {
    id: 11,
    name: 'Fleece Shorts',
    price: 1300,
    image: '/images/sweatpants.jpg',
    description: 'Lightweight fleece shorts with elastic waistband and inner drawcord, side pockets, and relaxed fit for all-day comfort.'
  },
  {
    id: 12,
    name: 'Raglan Long Sleeve',
    price: 1600,
    image: '/images/blank-tee.jpg',
    description: 'Three-quarter raglan sleeves with contrast stitching, 100% cotton jersey, athletic fit for movement and style.'
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
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Seekon Apparel</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Premium everyday essentials for the modern individual. Independent quality streetwear crafted with attention to detail—simple designs, premium materials, no logos, no compromises.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><button onClick={() => openModal('New Arrivals', 'Our latest drops just landed. Fresh styles, limited quantities. Check back weekly for new additions to our collection.')} className="text-gray-400 hover:text-white transition-colors">New Arrivals</button></li>
                <li><button onClick={() => openModal('Best Sellers', 'Our most popular items curated by customer favorites. These are the pieces that consistently receive 5-star reviews and repeat purchases.')} className="text-gray-400 hover:text-white transition-colors">Best Sellers</button></li>
                <li><button onClick={() => openModal('Collections', 'Explore our curated collections designed for different moods and occasions—from casual everyday wear to statement pieces.')} className="text-gray-400 hover:text-white transition-colors">Collections</button></li>
                <li><button onClick={() => openModal('Sale', 'Limited-time offers on selected styles. While supplies last—these deals disappear fast!')} className="text-gray-400 hover:text-white transition-colors">Sale</button></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg className="h-5 w-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span className="text-gray-400">KFC drive way Thika rd<br/>kahawa sukari, NAIROBI, 00100<br/>Kiambu County, Kenya</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <a href="tel:+254727672772" className="text-gray-400 hover:text-white transition-colors">+254 727 672 772</a>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <a href="mailto:muturinick8@gmail.com" className="text-gray-400 hover:text-white transition-colors">muturinick8@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Legal & Policies */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal & Policies</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => openModal(
                    'Refund Policy', 
                    'We offer a 30-day return policy on all unworn items with original tags. Returns must be in original condition with proof of purchase. Refunds are processed to the original payment method within 5-7 business days after we receive the returned item. Shipping costs for returns are the responsibility of the customer unless the return is due to our error.'
                  )} 
                  className="block w-full text-left text-gray-400 hover:text-white transition-colors"
                >
                  Refund Policy
                </button>
                <button 
                  onClick={() => openModal(
                    'Shipping Info', 
                    'We ship worldwide via trusted carriers including DHL, FedEx, and local postal services. Standard delivery takes 5-10 business days. Express shipping (2-3 business days) available at checkout. Free standard shipping on orders over KES 5,000 within Kenya. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient. Tracking information is provided for all orders via email once shipped.'
                  )} 
                  className="block w-full text-left text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Info
                </button>
                <button 
                  onClick={() => openModal(
                    'Terms of Service', 
                    'By purchasing from Seekon Apparel, you agree to these terms of service. All items are sold as described on our website. We reserve the right to modify prices, specifications, and availability without notice. Orders are subject to product availability and confirmation of order price. Copyright and intellectual property rights in all content on this site remain with Seekon Apparel. For complete terms or inquiries, please contact our customer service team.'
                  )} 
                  className="block w-full text-left text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => openModal(
                    'Privacy Policy', 
                    'We respect your privacy. We collect personal information only to process orders and improve your shopping experience. We do not sell or share your data with third parties for marketing purposes. All payment information is encrypted and processed securely. By using our site, you consent to our data practices as described in this policy.'
                  )} 
                  className="block w-full text-left text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Stay in the Loop</h4>
                <p className="text-gray-400 text-sm">Sign up for exclusive drops, restocks, and 10% off your first order.</p>
              </div>
              <div className="mt-4 md:mt-0 flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l border border-gray-700 focus:outline-none focus:border-gray-500 w-64"
                />
                <button className="bg-white text-gray-900 px-6 py-2 rounded-r font-medium hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Seekon Apparel. All rights reserved. | Independent quality streetwear since 2020.</p>
            <p className="mt-2">Designed with purpose. Made for comfort.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;