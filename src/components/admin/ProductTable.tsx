"use client";

import Image from "next/image";
import { Trash, Pencil, ChevronUp, ChevronDown, Star } from "lucide-react";
import { useState, useMemo } from "react";
import { Product } from "@/lib/dummyProducts";
import ConfirmationModal from "@/app/admin/products/ConfirmationModal";
import { ProductWithStatus } from "@/app/admin/products/page";

type SortConfig = {
  key: keyof Product;
  direction: 'ascending' | 'descending';
} | null;

interface ProductTableProps {
  products: ProductWithStatus[];
  setProducts: React.Dispatch<React.SetStateAction<ProductWithStatus[]>>;
  onEdit: (product: ProductWithStatus) => void;
  requestSort: (key: keyof Product) => void;
  sortConfig: SortConfig;
}

export default function ProductTable({
  products,
  setProducts,
  onEdit,
  requestSort,
  sortConfig,
}: ProductTableProps) {
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<ProductWithStatus | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  function toggleSelect(id: string | number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const currentPageProductIds = useMemo(() => products.map((p) => p.id), [products]);
  const isAllOnCurrentPageSelected = useMemo(
    () => currentPageProductIds.length > 0 && currentPageProductIds.every((id) => selected.includes(id)),
    [currentPageProductIds, selected]
  );

  function toggleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSelected((prev) => [...new Set([...prev, ...(currentPageProductIds as (string | number)[])])]);
    } else {
      setSelected((prev) => prev.filter((id) => !currentPageProductIds.includes(id as string)));
    }
  }

  function deleteSingleProduct() {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function deleteSelected() {
    setProducts((prev) =>
      prev.filter((p) => !selected.includes(p.id))
    );
    setSelected([]);
  }

  function markSelectedAsFeatured() {
    setProducts((prev) =>
      prev.map((p) =>
        selected.includes(p.id) ? { ...p, badge: "Featured" as any } : p
      )
    );
  }

  const getSortIcon = (key: keyof Product) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    if (sortConfig.direction === 'ascending') {
      return <ChevronUp size={16} className="inline ml-1" />;
    }
    return <ChevronDown size={16} className="inline ml-1" />;
  };

  const handleStatusToggle = (id: string | number) => {
    setProducts(prev => prev.map(p => p.id === id ? {...p, status: p.status === 'active' ? 'inactive' : 'active'} : p));
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div
          className={`transition-all duration-300 ease-in-out ${
            selected.length > 0 ? 'max-h-40' : 'max-h-0'
          } overflow-hidden`}
        >
          <div className="p-3 bg-gray-100 flex items-center gap-4">
            <span className="text-sm">{selected.length} selected</span>
            <button
              onClick={() => setShowBulkDeleteConfirm(true)}
              className="text-red-600 flex items-center gap-2 text-sm"
            >
              <Trash size={16} />
              Delete Selected
            </button>
            <button
              onClick={markSelectedAsFeatured}
              className="text-blue-600 flex items-center gap-2 text-sm"
            >
              <Star size={16} />
              Mark as Featured
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 text-left w-10">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={isAllOnCurrentPageSelected}
                  />
                </th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('name')}>
                  Name {getSortIcon('name')}
                </th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('price')}>
                  Price {getSortIcon('price')}
                </th>
                <th className="p-3 text-left cursor-pointer" onClick={() => requestSort('stock')}>
                  Stock {getSortIcon('stock')}
                </th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                    />
                  </td>
                  <td className="p-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </td>
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3 text-gray-600">{product.category}</td>
                  <td className="p-3">₦{product.price.toLocaleString()}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">
                    <button onClick={() => handleStatusToggle(product.id)} className={`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {product.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-3 flex gap-3 items-center">
                    <button onClick={() => onEdit(product)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTarget(product);
                        setShowDeleteConfirm(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Delete Confirmation */}
      <ConfirmationModal
        open={showDeleteConfirm}
        setOpen={setShowDeleteConfirm}
        onConfirm={deleteSingleProduct}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />

      {/* Bulk Delete Confirmation */}
      <ConfirmationModal
        open={showBulkDeleteConfirm}
        setOpen={setShowBulkDeleteConfirm}
        onConfirm={deleteSelected}
        title="Delete Selected Products"
        description={`Are you sure you want to delete ${selected.length} selected products? This action cannot be undone.`}
      />
    </>
  );
}