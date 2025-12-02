import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft, FiSave, FiImage, FiTag, FiDollarSign, FiLayers } from 'react-icons/fi'
import { api } from '../../services/api'

export default function AddProduct() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category_id: '',
        brand_id: '',
        image_url: '',
        inventory_status: 'In Stock'
    })

    useEffect(() => {
        // Fetch categories and brands for dropdowns
        const fetchData = async () => {
            try {
                const [cats, brnds] = await Promise.all([
                    api.getCategoryShortcuts(),
                    api.getFeaturedBrands()
                ])
                setCategories(cats)
                setBrands(brnds)
            } catch (err) {
                console.error('Failed to load form data', err)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await api.createProduct(formData)
            navigate('/admin/products')
        } catch (err) {
            setError('Failed to create product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link to="/admin/products" className="p-2 hover:bg-brand-light rounded-full transition-colors">
                    <FiArrowLeft className="w-5 h-5 text-brand-gray" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-brand-black tracking-tight">Add New Product</h1>
                    <p className="text-brand-gray mt-1">Create a new item in your catalog</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-medium text-center">
                        {error}
                    </div>
                )}

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-light space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-black ml-1">Product Title</label>
                        <div className="relative group">
                            <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors" />
                            <input
                                type="text"
                                required
                                className="w-full pl-11 pr-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                                placeholder="e.g. Wireless Headphones"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-black ml-1">Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full p-4 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium resize-none"
                            placeholder="Product details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-black ml-1">Price</label>
                            <div className="relative group">
                                <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors" />
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full pl-11 pr-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-black ml-1">Inventory Status</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium appearance-none cursor-pointer"
                                    value={formData.inventory_status}
                                    onChange={(e) => setFormData({ ...formData, inventory_status: e.target.value })}
                                >
                                    <option value="In Stock">In Stock</option>
                                    <option value="Low Stock">Low Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-black ml-1">Category</label>
                            <div className="relative group">
                                <FiLayers className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors" />
                                <select
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium appearance-none cursor-pointer"
                                    value={formData.category_id}
                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-black ml-1">Brand (Optional)</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium appearance-none cursor-pointer"
                                    value={formData.brand_id}
                                    onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-black ml-1">Image URL</label>
                        <div className="relative group">
                            <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors" />
                            <input
                                type="url"
                                className="w-full pl-11 pr-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        to="/admin/products"
                        className="px-8 py-4 rounded-2xl font-bold text-brand-gray hover:bg-brand-light transition-all"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-brand-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-dark transform hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-black/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? 'Saving...' : (
                            <>
                                <FiSave className="w-5 h-5" />
                                Save Product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
