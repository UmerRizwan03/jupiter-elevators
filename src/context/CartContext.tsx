"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ElevatorPart, RfqCartItem } from "@/types/catalog";

interface CartContextType {
  items: RfqCartItem[];
  addItem: (part: ElevatorPart, quantity?: number, notes?: string) => void;
  removeItem: (partId: string) => void;
  updateQuantity: (partId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "jupiter_elevators_rfq_cart";

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

  const addItem = (part: ElevatorPart, quantity: number = 1, notes?: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.part.id === part.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].notes = notes;
        return updated;
      }
      return [...prev, { part, quantity, notes }];
    });
  };

  const removeItem = (partId: string) => {
    setItems((prev) => prev.filter((item) => item.part.id !== partId));
  };

  const updateQuantity = (partId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(partId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.part.id === partId ? { ...item, quantity } : item
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
