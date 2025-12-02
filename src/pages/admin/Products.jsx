import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiPlus, FiTrash2, FiEdit2, FiMoreVertical } from 'react-icons/fi'
import { api } from '../../services/api'
import ConfirmationModal from '../../components/common/ConfirmationModal'

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null })

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 500)
        return () => clearTimeout(timer)
    }, [search])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const data = await api.getAdminProducts({
                page,
                limit: 10,
                search: debouncedSearch
            })
            setProducts(data.products)
            setTotalPages(data.totalPages)
            setError('')
        } catch (err) {
            setError('Failed to load products')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [page, debouncedSearch])

    const handleDeleteClick = (id) => {
        setDeleteModal({ isOpen: true, productId: id })
    }

    const handleConfirmDelete = async () => {
        try {
            await api.deleteProduct(deleteModal.productId)
            fetchProducts()
        } catch (err) {
            alert('Failed to delete product')
        }
    }

    return (
        <>
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-black tracking-tight">Products</h1>
                        <p className="text-brand-gray mt-1">Manage your product catalog</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative group">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-11 pr-4 py-3 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none w-full sm:w-72 transition-all shadow-sm"
                            />
                        </div>

                        <Link
                            to="/admin/products/new"
                            className="flex items-center justify-center gap-2 bg-brand-black text-white px-6 py-3 rounded-2xl font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand-black/20"
                        >
                            <FiPlus className="w-5 h-5" />
                            Add Product
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 font-medium">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-sm border border-brand-light overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-brand-light/30 border-b border-brand-light text-sm font-semibold text-brand-gray">
                                    <th className="px-8 py-5">Product</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Price</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-light">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-12 text-center text-brand-gray">Loading products...</td>
                                    </tr>
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-12 text-center text-brand-gray">No products found.</td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} className="hover:bg-brand-light/30 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-brand-light/50 overflow-hidden flex-shrink-0">
                                                        {product.image_url ? (
                                                            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-brand-gray text-xs">No img</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-brand-black">{product.title}</div>
                                                        <div className="text-xs text-brand-gray mt-0.5 max-w-[200px] truncate">{product.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-medium text-brand-gray">
                                                {product.category_name || '-'}
                                            </td>
                                            <td className="px-8 py-5 font-bold text-brand-black">
                                                ${Number(product.price).toLocaleString()}
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${product.inventory_status === 'In Stock' ? 'bg-green-100 text-green-700' :
                                                    product.inventory_status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {product.inventory_status || 'In Stock'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        to={`/admin/products/${product.id}/edit`}
                                                        className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-brand-light text-brand-gray hover:text-brand-accent transition-all"
                                                        title="Edit Product"
                                                    >
                                                        <FiEdit2 className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(product.id)}
                                                        className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 text-brand-gray hover:text-red-600 transition-all"
                                                        title="Delete Product"
                                                    >
                                                        <FiTrash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="px-8 py-5 border-t border-brand-light flex items-center justify-between bg-brand-light/10">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="px-5 py-2.5 text-sm font-semibold text-brand-black bg-white border border-brand-light rounded-xl hover:bg-brand-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                Previous
                            </button>
                            <span className="text-sm font-medium text-brand-gray">
                                Page <span className="text-brand-black font-bold">{page}</span> of {totalPages}
                            </span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                                className="px-5 py-2.5 text-sm font-semibold text-brand-black bg-white border border-brand-light rounded-xl hover:bg-brand-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={handleConfirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                confirmText="Delete"
                isDangerous={true}
            />
        </>
    )
}
