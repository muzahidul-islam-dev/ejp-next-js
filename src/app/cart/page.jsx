"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
            <Link href="/products">
              <Button className="gap-2">
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4 md:p-6">
                <div className="flex gap-4">
                  
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-lg hover:text-blue-600 truncate">{item.name}</h3>
                    </Link>
                    <p className="text-muted-foreground mb-4">${item.price} each</p>

                    
                    <div className="flex items-center gap-2 mb-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-muted rounded"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 bg-muted rounded">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-muted rounded"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  
                  <div className="text-right flex flex-col justify-between">
                    <p className="text-xl font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div>
            <Card className="p-6 sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="space-y-3 border-t border-b border-border py-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span className="text-blue-600">${(cartTotal * 1.1).toFixed(2)}</span>
              </div>

              <Link href="/checkout">
                <button size="lg" className="btn btn-info text-white">
                  Proceed to Checkout
                </button>
              </Link>

              <Link href="/products">
                <button className="w-full btn btn-info text-white">
                  Continue Shopping
                </button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
