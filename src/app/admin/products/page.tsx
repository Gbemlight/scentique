"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { products as initialProducts, Product } from "@/lib/dummyProducts";
import ProductTable from "@/components/admin/ProductTable";
import ProductModal from "@/components/admin/ProductModal";
import ProductFilterBar from "@/components/admin/ProductFilterBar";
import Pagination from "./Pagination";

type SortConfig = {
  key: keyof Product;
  direction: 'ascending' | 'descending';
} | null;

export type ProductWithStatus = Product & { status: 'active' | 'inactive'; slug?: string };

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithStatus[]>(initialProducts.map(p => ({...p, status: 'active'})));
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductWithStatus | null>(null);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [featuredFilter, setFeaturedFilter] = useState("All");

  // Sort state
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleAddProduct = () => {
    setProductToEdit(null);
    setOpenModal(true);
  };

  const handleEditProduct = (product: ProductWithStatus) => {
    setProductToEdit(product);
    setOpenModal(true);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products
      .filter((p) => {
        if (!search) return true;
        return p.name.toLowerCase().includes(search.toLowerCase());
      })
      .filter((p) => {
        if (categoryFilter === "All") return true;
        return p.category === categoryFilter;
      })
      .filter((p) => {
        if (stockFilter === "All") return true;
        if (stockFilter === "In Stock") return (p.stock ?? 0) > 5;
        if (stockFilter === "Low Stock") return (p.stock ?? 0) > 0 && (p.stock ?? 0) <= 5;
        if (stockFilter === "Out of Stock") return (p.stock ?? 0) === 0;
        return true;
      })
      .filter((p) => {
        if (featuredFilter === "All") return true;
        if (featuredFilter === "Featured") return (p.badge as string) === "Featured";
        if (featuredFilter === "Not Featured") return (p.badge as string) !== "Featured";
        return true;
      });

    if (sortConfig !== null) {
      // Create a new sorted array instead of mutating in place
      return [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Handle null or undefined values to sort them consistently to the end.
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        let comparison = 0;
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        }

        return sortConfig.direction === 'ascending' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [products, search, categoryFilter, stockFilter, featuredFilter, sortConfig]);

  const categories = useMemo(() => [...new Set(initialProducts.map(p => p.category))], []);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredProducts.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredProducts, currentPage, rowsPerPage]);

  const requestSort = (key: keyof Product) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      setSortConfig(null);
      return;
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <ProductFilterBar
        search={search}
        setSearch={setSearch}
        category={categoryFilter}
        setCategory={setCategoryFilter}
        stockStatus={stockFilter}
        setStockStatus={setStockFilter}
        featuredStatus={featuredFilter}
        setFeaturedStatus={setFeaturedFilter}
        categories={categories}
      />

      <ProductTable
        products={paginatedProducts}
        setProducts={setProducts}
        onEdit={handleEditProduct}
        requestSort={requestSort}
        sortConfig={sortConfig}
      />

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing {paginatedProducts.length} of {filteredProducts.length} products
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page
              }}
              className="border p-1 rounded"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <Pagination
            total={filteredProducts.length}
            pageSize={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <ProductModal
        open={openModal}
        setOpen={setOpenModal}
        setProducts={setProducts}
        productToEdit={productToEdit}
        categories={categories}
      />
    </div>
  );
}