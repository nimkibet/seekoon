import React from 'react'

const products = [
  {
    id: 1,
    name: 'Essential Heavyweight Hoodie',
    price: 2500,
    image: '/images/blank-hoodie.jpg'
  },
  {
    id: 2,
    name: 'Classic Blank Tee',
    price: 1200,
    image: '/images/blank-tee.jpg'
  },
  {
    id: 3,
    name: 'Everyday Sweatpants',
    price: 1800,
    image: '/images/sweatpants.jpg'
  }
]

function App() {
  const handleBuyNow = (productName) => {
    alert(`Added ${productName} to cart`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold tracking-tight">Seekon Apparel</h1>
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
                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    KES {product.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleBuyNow(product.name)}
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

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Seekon Apparel. All rights reserved.</p>
          <p className="mt-2">
            <a href="mailto:support@seekonapparel.com" className="hover:underline">
              support@seekonapparel.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
