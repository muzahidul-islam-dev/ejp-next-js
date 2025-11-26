"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/products"
import { Edit2, Trash2, Plus } from "lucide-react"

export default function AdminPage() {
  const [adminProducts, setAdminProducts] = useState(products)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "accessories",
    description: "",
    stock: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      stock: product.stock,
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editingId) {
      setAdminProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...formData, price: Number.parseFloat(formData.price), stock: Number.parseInt(formData.stock) }
            : p,
        ),
      )
    } else {
      const newProduct = {
        id: Math.max(...adminProducts.map((p) => p.id)) + 1,
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        image: "/placeholder.svg",
      }
      setAdminProducts((prev) => [...prev, newProduct])
    }
    resetForm()
  }

  const handleDelete = (id) => {
    setAdminProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "accessories",
      description: "",
      stock: "",
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={() => setShowForm(!showForm)} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="p-6 mb-8 space-y-4">
            <h2 className="text-xl font-bold">{editingId ? "Edit" : "Add"} Product</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="audio">Audio</option>
                  <option value="wearables">Wearables</option>
                  <option value="photography">Photography</option>
                  <option value="accessories">Accessories</option>
                </select>
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingId ? "Update" : "Create"} Product
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Products Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Product</th>
                  <th className="px-6 py-4 text-left font-semibold">Category</th>
                  <th className="px-6 py-4 text-right font-semibold">Price</th>
                  <th className="px-6 py-4 text-right font-semibold">Stock</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4 text-right font-semibold text-blue-600">${product.price}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>{product.stock}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                          <Edit2 className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6">
            <p className="text-muted-foreground mb-2">Total Products</p>
            <p className="text-4xl font-bold">{adminProducts.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground mb-2">Total Value</p>
            <p className="text-4xl font-bold text-blue-600">
              ${adminProducts.reduce((sum, p) => sum + p.price * p.stock, 0).toFixed(2)}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground mb-2">Items in Stock</p>
            <p className="text-4xl font-bold">{adminProducts.reduce((sum, p) => sum + p.stock, 0)}</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
