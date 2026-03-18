"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Product } from "@/lib/dummyProducts";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import { useEffect } from "react";
import { ProductWithStatus } from "@/app/admin/products/page";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0.01, "Price is required"),
  originalPrice: z.coerce.number().optional().nullable(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false),
  image: z.string().url("Must be a valid image URL").min(1, "Image URL is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setProducts: React.Dispatch<React.SetStateAction<ProductWithStatus[]>>;
  productToEdit?: ProductWithStatus | null;
  categories: string[];
}

export default function ProductModal({
  open,
  setOpen,
  setProducts,
  productToEdit,
  categories,
}: ProductModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
  });

  useEffect(() => {
    if (open) {
      if (productToEdit) {
        reset({
          ...productToEdit,
          isFeatured: (productToEdit.badge as string) === 'Featured',
          originalPrice: productToEdit.originalPrice || null,
        });
      } else {
        reset({
          name: "",
          category: "",
          price: undefined,
          originalPrice: undefined,
          stock: 0,
          description: "",
          isFeatured: false,
          image: "",
        });
      }
    }
  }, [open, productToEdit, reset]);

  const onSubmit = (data: ProductFormData) => {
    if (productToEdit) {
      // Update existing product
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== productToEdit.id) return p;

          // Create a fully-typed updated product object to prevent type inference issues
          const updatedProduct: ProductWithStatus = {
            ...p,
            name: data.name,
            category: data.category,
            price: data.price,
            originalPrice: data.originalPrice ?? undefined,
            stock: data.stock,
            description: data.description || "",
            image: data.image,
            badge: data.isFeatured ? ("Featured" as any) : undefined,
            // Also update fields that depend on other form fields for data consistency
            scentFamily: data.category,
            slug: data.name.toLowerCase().replace(/\s+/g, "-"),
          };
          return updatedProduct;
        })
      );
    } else {
      // Add new product
      const newProduct: ProductWithStatus = {
        id: String(Date.now()),
        name: data.name,
        category: data.category,
        price: data.price,
        originalPrice: data.originalPrice ?? undefined,
        stock: data.stock,
        description: data.description || "",
        image: data.image,
        badge: data.isFeatured ? ("Featured" as any) : undefined,
        brand: "Scentique",
        rating: 5,
        reviewCount: 0,
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
        status: 'active',
        scentFamily: data.category,
        sizes: [],
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded-lg w-112.5 max-w-[95vw] -translate-x-1/2 -translate-y-1/2 shadow-lg z-50">
          <Dialog.Title className="text-lg font-bold mb-4">
            {productToEdit ? "Edit Product" : "Add Product"}
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            <Input
              label="Product Name"
              {...register("name")}
              error={errors.name?.message}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select {...register("category")} className="border p-2 w-full rounded-md">
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                type="number"
                step="0.01"
                {...register("price")}
                error={errors.price?.message}
              />
              <Input
                label="Original Price (Optional)"
                type="number"
                step="0.01"
                {...register("originalPrice")}
                error={errors.originalPrice?.message}
              />
            </div>

            <Input
              label="Stock Quantity"
              type="number"
              {...register("stock")}
              error={errors.stock?.message}
            />

            <Textarea
              label="Description"
              {...register("description")}
              error={errors.description?.message}
              rows={4}
            />

            <Input
              label="Image URL"
              {...register("image")}
              error={errors.image?.message}
            />

            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    label="Featured Product"
                  />
                </div>
              )}
            />

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Dialog.Close asChild>
                <button type="button" className="border px-4 py-2 rounded">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}