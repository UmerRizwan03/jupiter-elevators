"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ElevatorPart, RFQItem } from "@/types/catalog";
import { elevatorCategories } from "@/data/categories";

interface CartContextType {
  items: RFQItem[];
  addToCart: (part: ElevatorPart, quantity?: number, notes?: string) => void;
  removeFromCart: (partId: string) => void;
  updateQuantity: (partId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalQuantity: number;
  isItemInCart: (partId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<RFQItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("jupiter_rfq_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load RFQ cart from localStorage", e);
    }
  }, []);

  const saveItems = (newItems: RFQItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("jupiter_rfq_cart", JSON.stringify(newItems));
    } catch (e) {
      console.error("Failed to save RFQ cart to localStorage", e);
    }
  };

  const addToCart = (part: ElevatorPart, quantity = 1, notes?: string) => {
    const category = elevatorCategories.find((c) => c.id === part.categoryId);
    const existingIndex = items.findIndex((i) => i.partId === part.id);

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += quantity;
      if (notes) updated[existingIndex].notes = notes;
      saveItems(updated);
    } else {
      const newItem: RFQItem = {
        partId: part.id,
        sku: part.sku,
        name: part.name,
        categoryName: category?.name || { en: "Spare Part", ar: "قطعة غيار" },
        quantity: Math.max(1, quantity),
        image: part.image,
        notes,
      };
      saveItems([...items, newItem]);
    }
  };

  const removeFromCart = (partId: string) => {
    saveItems(items.filter((i) => i.partId !== partId));
  };

  const updateQuantity = (partId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(partId);
      return;
    }
    saveItems(items.map((i) => (i.partId === partId ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    saveItems([]);
  };

  const isItemInCart = (partId: string) => items.some((i) => i.partId === partId);

  const totalItems = items.length;
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalQuantity,
        isItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
