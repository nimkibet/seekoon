import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Essential Heavyweight Hoodie',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1556821840-3a63a9561f27?w=800&q=80',
    description: '100% heavy-weight cotton, relaxed fit, pre-shrunk, double-stitched seams for maximum durability and comfort. Machine washable.'
  },
  {
    id: 2,
    name: 'Classic Blank Tee',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    description: 'Premium combed ring-spun cotton, shoulder-to-shoulder taping, retail fit perfect for everyday wear. Pre-shrunk.'
  },
  {
    id: 3,
    name: 'Everyday Sweatpants',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
    description: '80% cotton / 20% polyester fleece blend, elastic waistband with drawstring, tapered leg for modern silhouette.'
  },
  {
    id: 4,
    name: 'Long Sleeve Basic Top',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1578585080565-e284071dbd67?w=800&q=80',
    description: '100% combed and ring-spun cotton, side-seamed construction, versatile unisex fit for layering or solo wear.'
  },
  {
    id: 5,
    name: 'Heavyweight Fleece Jacket',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    description: '12oz heavyweight fleece with anti-pill finish, two-way front zipper, and multiple secure pockets for functionality.'
  },
  {
    id: 6,
    name: 'Premium Jogger Set',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
    description: 'Matching hoodie and jogger set with brushed fleece interior, ribbed cuffs and hem for a polished athletic look.'
  },
  {
    id: 7,
    name: 'Vintage Washed Tee',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    description: 'Garment-dyed cotton with a soft vintage feel, pre-shrunk fabric that maintains fit after repeated washes.'
  },
  {
    id: 8,
    name: 'Urban Cargo Pants',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    description: 'Durable cotton twill with multiple cargo pockets, relaxed fit with tapered ankle, reinforced stitching.'
  },
  {
    id: 9,
    name: 'Oversized Hoodie',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80',
    description: 'Boxy oversized fit with dropped shoulders, premium fleece interior, kangaroo pocket, ribbed hem and cuffs.'
  },
  {
    id: 10,
    name: 'Basic Cap',
    price: 900,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
    description: 'Structured 6-panel cotton twill cap with adjustable strap, embroidered eyelets, and curved brim for a classic look.'
  },
  {
    id: 11,
    name: 'Fleece Shorts',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
    description: 'Lightweight fleece shorts with elastic waistband and inner drawcord, side pockets, and relaxed fit for all-day comfort.'
  },
  {
    id: 12,
    name: 'Raglan Long Sleeve',
    price: 1600,
    image: 'https://images.unsplash.com/photo-1625910513413-5fc45e77b1b8?w=800&q=80',
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
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
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

  const closeModal = () => {
    setModalContent({ title: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">Seekon Apparel</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={openCart}
                className="p-2 rounded hover:bg-gray-100 transition-colors"
                aria-label="Open cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.737 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Our Collection
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Curated essentials designed for comfort and durability. Each piece is crafted with premium materials for everyday wear.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mb-4">
                    KES {product.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded font-medium hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 flex ${cartOpen ? 'block' : 'hidden'}`}>
        <button
          onClick={closeCart}
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          aria-label="Close cart overlay"
        />
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.737 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm mt-2">Add some items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-600">KES {item.price.toLocaleString()}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-gray-700 p-1"
                          aria-label="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="mx-3 font-medium text-gray-900">Qty: {item.quantity}</span>
                        <span className="text-gray-900 font-semibold">
                          KES {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-2xl font-bold text-gray-900">KES {getCartTotal().toLocaleString()}</span>
              </div>
              <button
                onClick={proceedToCheckout}
                className="w-full bg-gray-900 text-white py-4 px-6 rounded font-semibold hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ${checkoutModalOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Gateway Maintenance
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our payment gateway is currently undergoing scheduled maintenance.
              Please try your purchase again in 24 hours.
            </p>
            <button
              onClick={closeCheckoutModal}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors"
            >
              Return to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modals */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ${modalContent.title ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-lg p-8 w-full max-w-lg mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-gray-900">{modalContent.title}</h2>
            <button
              onClick={closeModal}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {modalContent.content}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Section */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 tracking-tight">Seekon Apparel</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Premium everyday essentials for the modern individual.
                Independent quality streetwear—simple designs, premium materials, no logos, no compromises.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => openModal('New Arrivals', 'Our latest drops just landed. Fresh styles, limited quantities. Check back weekly for new additions to our collection.')} className="text-gray-400 hover:text-white transition-colors">
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button onClick={() => openModal('Best Sellers', 'Our most popular items curated by customer favorites. These are the pieces that consistently receive 5-star reviews and repeat purchases.')} className="text-gray-400 hover:text-white transition-colors">
                    Best Sellers
                  </button>
                </li>
                <li>
                  <button onClick={() => openModal('Collections', 'Explore our curated collections designed for different moods and occasions—from casual everyday wear to statement pieces.')} className="text-gray-400 hover:text-white transition-colors">
                    Collections
                  </button>
                </li>
                <li>
                  <button onClick={() => openModal('Sale', 'Limited-time offers on selected styles. While supplies last—these deals disappear fast!')} className="text-gray-400 hover:text-white transition-colors">
                    Sale
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <svg className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400 leading-relaxed">
                    KFC drive way Thika rd<br/>kahawa sukari, NAIROBI, 00100<br/>Kiambu County, Kenya
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+254727672772" className="text-gray-400 hover:text-white transition-colors">+254 727 672 772</a>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:muturinick8@gmail.com" className="text-gray-400 hover:text-white transition-colors break-all">muturinick8@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Legal & Policies */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal & Policies</h4>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => openModal(
                    'Refund Policy (14 Days)',
                    'We offer a 14-day return policy on all unworn items with original tags. Returns must be in original condition with proof of purchase. Refunds are processed to the original payment method within 5-7 business days after we receive the returned item. Shipping costs for returns are the responsibility of the customer unless the return is due to our error. Clearance items are final sale.'
                  )}
                  className="block w-full text-left text-gray-400 hover:text-white transition-colors"
                >
                  Refund Policy (14 Days)
                </button>
                <button
                  onClick={() => openModal(
                    'Shipping Information',
                    'We ship worldwide via trusted carriers including DHL, FedEx, and local postal services. Standard delivery takes 5-10 business days. Express shipping (2-3 business days) available at checkout. Free standard shipping on orders over KES 5,000 within Kenya. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient. Tracking information is provided for all orders via email once shipped.'
                  )}
                  className="block w-full text-left text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Information
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
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-base font-semibold text-white mb-1">Stay in the Loop</h4>
                <p className="text-gray-400 text-sm">Sign up for exclusive drops, restocks, and 10% off your first order.</p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white px-4 py-2.5 rounded-l border border-gray-700 focus:outline-none focus:border-gray-500 w-full md:w-64 placeholder-gray-500"
                />
                <button className="bg-white text-gray-900 px-6 py-2.5 rounded-r font-medium hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs">
            <p>&copy; {new Date().getFullYear()} Seekon Apparel. All rights reserved.</p>
            <p className="mt-1">Independent quality streetwear.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
