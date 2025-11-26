"use client"

import Link from "next/link"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react"

export default function ProductDetail({ params }) {
  const parameter = use(params);
  console.log(parameter, 'this is parameter')
  const router = useRouter()
  const { addToCart } = useCart()
  const product = products.find((p) => p.id === Number.parseInt(parameter.id))
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + change)))
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <Card className="overflow-hidden">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-96 object-cover" />
            </Card>
          </div>

          
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.description}</p>
            </div>

            
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-blue-600">${product.price}</span>
              </div>
              <p className={`text-lg font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
            </div>

            
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-muted"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-muted"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                
                <Button onClick={handleAddToCart} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </Button>
              </div>
            )}

            {product.stock === 0 && (
              <Button disabled size="lg" className="w-full">
                Out of Stock
              </Button>
            )}

            
            <Card className="p-6 bg-slate-50 dark:bg-slate-900">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-semibold">SKU:</span> {`PRD-${product.id.toString().padStart(4, "0")}`}
                </li>
                <li>
                  <span className="font-semibold">Category:</span>{" "}
                  <span className="capitalize">{product.category}</span>
                </li>
                <li>
                  <span className="font-semibold">Stock:</span> {product.stock} units
                </li>
              </ul>
            </Card>
          </div>
        </div>

        
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                      <p className="text-2xl font-bold text-blue-600">${relatedProduct.price}</p>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
