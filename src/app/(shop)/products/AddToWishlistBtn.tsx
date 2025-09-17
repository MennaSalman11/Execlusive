
"use client";
import { useWishlist } from '@/context/WishlistContext';
import { addToWishlist, removeFromWishlist } from '@/lib/services/wishlist.services';
import { Heart } from 'lucide-react';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

export default function WishlistHeart({ productId, ...props }: { productId: string;[key: string]: any }) {
  const [isPending, startTransition] = useTransition();
  const { wishlistDetails, getWishlistDetails } = useWishlist();


  const liked = Array.isArray(wishlistDetails?.data)
    ? wishlistDetails.data.some(
      (item: any) =>
        item.id === productId ||
        item._id === productId ||
        item.productId === productId
    )
    : false;

  const toggleLike = () => {
    startTransition(async () => {
      try {
        if (!liked) {
          const res = await addToWishlist(productId);
          if (res?.success) {
            toast.success("Product added to wishlist", { position: "top-center" });
            getWishlistDetails();
          }
        } else {
          const res = await removeFromWishlist(productId);
          if (res?.success) {
            toast.success("Product removed from wishlist", { position: "top-center" });
            getWishlistDetails();
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong", { position: "top-center" });
      }
    });
  };

  return (
    <Heart
      onClick={toggleLike}
      className={`size-6 absolute top-1 end-2 cursor-pointer transition-colors duration-200 ${liked ? "text-red-500 fill-red-500" : "text-black fill-white"
        }`}
      aria-pressed={liked}
      {...props}
    />
  );
}
