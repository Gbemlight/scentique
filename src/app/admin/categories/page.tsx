"use client";

import { useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

const dummyCategories: Category[] = [
  { id: '1', name: 'Perfumes', slug: 'perfumes', description: 'Luxury fragrances', image: '/cat1.jpg', productCount: 12 },
  { id: '2', name: 'Colognes', slug: 'colognes', description: 'Everyday scents', image: '/cat2.jpg', productCount: 8 },
  { id: '3', name: 'Gift Sets', slug: 'gift-sets', description: 'Perfect for gifting', image: '/cat3.jpg', productCount: 5 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const generateSlug = (value: string) => {
    const s = value
      .toLowerCase()
      .replace(/\s+/g, "-");

    setName(value);
    setSlug(s);
  };

  const handleSubmit = () => {
    if (!name) return;
    
    if (isEditing) {
      setCategories(prev => prev.map(cat => 
        cat.id === isEditing 
          ? { ...cat, name, slug, description, image } 
          : cat
      ));
      setIsEditing(null);
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name,
        slug,
        description,
        image,
        productCount: 0
      };
      setCategories([...categories, newCategory]);
    }
    
    // Reset form
    setName("");
    setSlug("");
    setDescription("");
    setImage("");
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setSlug(category.slug);
    setDescription(category.description);
    setImage(category.image);
    setIsEditing(category.id);
  };

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="md:col-span-3">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      {/* ADD CATEGORY */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 h-fit">
        <h2 className="font-semibold text-lg">{isEditing ? 'Edit Category' : 'Add New Category'}</h2>
        
        <input
          placeholder="Category Name"
          className="border p-2 w-full rounded-md"
          value={name}
          onChange={(e) => generateSlug(e.target.value)}
        />

        <input
          placeholder="Slug"
          className="border p-2 w-full rounded-md bg-gray-50"
          value={slug}
          readOnly
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Image URL"
          className="border p-2 w-full rounded-md"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button 
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full font-medium hover:bg-indigo-700 transition-colors"
        >
          {isEditing ? 'Update Category' : 'Save Category'}
        </button>
        
        {isEditing && (
          <button 
            onClick={() => {
              setIsEditing(null);
              setName("");
              setSlug("");
              setDescription("");
              setImage("");
            }}
            className="text-gray-500 text-sm w-full text-center hover:text-gray-700"
          >
            Cancel
          </button>
        )}
      </div>

      {/* CATEGORY LIST */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium">Count</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{cat.name}</td>
                <td className="p-4 text-gray-600">{cat.slug}</td>
                <td className="p-4">{cat.productCount}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => handleEdit(cat)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-xs px-2 py-1 rounded border border-indigo-200"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:text-red-800 font-medium text-xs px-2 py-1 rounded border border-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No categories found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}