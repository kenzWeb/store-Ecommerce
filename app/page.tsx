import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to Our Store
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover our curated collection of products. Quality meets style in
              every item we offer.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" /> Shop Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}