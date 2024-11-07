"use client";

import { useState } from "react";
import { Button } from "./button";
import { Check, Loader2, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddToCartButtonProps {
  onAdd: () => void;
  className?: string;
}

export function AddToCartButton({ onAdd, className = "" }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = async () => {
    setIsAdding(true);
    onAdd();
    
    // Simulate a delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAdding(false);
    setIsAdded(true);
    
    // Reset after showing success state
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Button 
      onClick={handleClick} 
      size="lg" 
      className={`relative ${className}`}
      disabled={isAdding || isAdded}
    >
      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Adding...
          </motion.div>
        ) : isAdded ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-green-500"
          >
            <Check className="h-4 w-4" />
            Added!
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}