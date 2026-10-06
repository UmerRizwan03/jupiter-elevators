"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ElevatorPart, PartVariant, RfqCartItem } from "@/types/catalog";

interface CartContextType {
  items: RfqCartItem[];
  addItem: (
    part: ElevatorPart,
    quantity?: number,
    notes?: string,
    selectedVariant?: PartVariant
  ) => void;
  removeItem: (partId: string, variantModel?: string) => void;
  updateQuantity: (partId: string, quantity: number, variantModel?: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "jupiter_elevators_rfq_cart";

const isSameItem = (item: RfqCartItem, partId: string, variantModel?: string): boolean => {
  if (item.part.id !== partId) return false;
  if (variantModel === undefined) {
    return true;
  }
  return item.selectedVariant?.model === variantModel;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<RfqCartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // Restore browser-only persisted state after hydration to keep SSR markup consistent.
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is an external client-side store.
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load RFQ cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to persist RFQ cart to localStorage", e);
      }
    }
  }, [items, isLoaded]);

  const addItem = (
    part: ElevatorPart,
    quantity: number = 1,
    notes?: string,
    selectedVariant?: PartVariant
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) =>
        item.part.id === part.id && item.selectedVariant?.model === selectedVariant?.model
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].notes = notes;
        return updated;
      }
      return [...prev, { part, quantity, notes, selectedVariant }];
    });
  };

  const removeItem = (partId: string, variantModel?: string) => {
    setItems((prev) => prev.filter((item) => !isSameItem(item, partId, variantModel)));
  };

  const updateQuantity = (partId: string, quantity: number, variantModel?: string) => {
    if (quantity <= 0) {
      removeItem(partId, variantModel);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        isSameItem(item, partId, variantModel) ? { ...item, quantity } : item
      )
    );
  };


  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemsCount,
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
