import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const featuredProducts = [
  { id: 1, name: "Premium Headphones", price: 199, image: "/premium-headphones.png" },
  { id: 2, name: "Wireless Speaker", price: 149, image: "/wireless-speaker.jpg" },
  { id: 3, name: "Smart Watch", price: 299, image: "/smartwatch-lifestyle.png" },
  { id: 4, name: "Camera", price: 899, image: "/professional-camera.png" },
]

export const metadata = {
  title: "ShopHub - Modern Ecommerce",
  description: "Discover premium products at unbeatable prices",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">Welcome to ShopHub</h1>
            <p className="text-lg md:text-xl text-slate-300">Discover premium products at unbeatable prices</p>
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Exclusive Deals Waiting</h2>
          <p className="text-lg text-muted-foreground">
            Browse our full collection and find exactly what youre looking for
          </p>
          <Link href="/products">
            <Button size="lg" variant="default">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
