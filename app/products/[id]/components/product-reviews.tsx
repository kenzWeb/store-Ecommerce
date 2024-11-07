"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageSquare, Filter, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Reply {
  id: number;
  user: string;
  comment: string;
  date: string;
  avatar: string;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  helpfulBy: string[];
  avatar: string;
  replies: Reply[];
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    user: "Alex Johnson",
    rating: 5,
    comment: "Absolutely love this product! The quality is outstanding and it exceeded my expectations.",
    date: "2024-01-15",
    helpful: 12,
    helpfulBy: [],
    avatar: "https://i.pravatar.cc/150?img=1",
    replies: [],
  },
  {
    id: 2,
    user: "Sarah Smith",
    rating: 4,
    comment: "Great product overall. Would definitely recommend it to others.",
    date: "2024-01-10",
    helpful: 8,
    helpfulBy: [],
    avatar: "https://i.pravatar.cc/150?img=2",
    replies: [],
  },
  {
    id: 3,
    user: "Michael Brown",
    rating: 5,
    comment: "Perfect fit and amazing quality. Will be buying more!",
    date: "2024-01-05",
    helpful: 15,
    helpfulBy: [],
    avatar: "https://i.pravatar.cc/150?img=3",
    replies: [],
  },
];

const CURRENT_USER = {
  id: "current-user",
  name: "Current User",
  avatar: "https://i.pravatar.cc/150?img=4",
};

interface ProductReviewsProps {
  productId: number;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent");
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleSort = (type: "recent" | "helpful" | "rating") => {
    setSortBy(type);
    const sorted = [...reviews].sort((a, b) => {
      switch (type) {
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "helpful":
          return b.helpful - a.helpful;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    setReviews(sorted);
  };

  const handleHelpful = (reviewId: number) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        if (review.helpfulBy.includes(CURRENT_USER.id)) {
          return {
            ...review,
            helpful: review.helpful - 1,
            helpfulBy: review.helpfulBy.filter(id => id !== CURRENT_USER.id),
          };
        } else {
          return {
            ...review,
            helpful: review.helpful + 1,
            helpfulBy: [...review.helpfulBy, CURRENT_USER.id],
          };
        }
      }
      return review;
    }));
  };

  const handleReply = (reviewId: number) => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    const newReply: Reply = {
      id: Date.now(),
      user: CURRENT_USER.name,
      comment: replyText,
      date: new Date().toISOString(),
      avatar: CURRENT_USER.avatar,
    };

    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          replies: [...review.replies, newReply],
        };
      }
      return review;
    }));

    setReplyText("");
    setReplyingTo(null);
    toast.success("Reply added successfully");
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSort("recent")}>
              Most Recent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("helpful")}>
              Most Helpful
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("rating")}>
              Highest Rating
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <img src={review.avatar} alt={review.user} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{review.user}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <time className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </time>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <Button
                        variant={review.helpfulBy.includes(CURRENT_USER.id) ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => handleHelpful(review.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </div>

                    {/* Reply Form */}
                    <AnimatePresence>
                      {replyingTo === review.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4"
                        >
                          <div className="flex gap-2">
                            <Textarea
                              placeholder="Write your reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="min-h-[80px]"
                            />
                          </div>
                          <div className="flex justify-end gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleReply(review.id)}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Send Reply
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Replies */}
                    {review.replies.length > 0 && (
                      <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-100 dark:border-gray-800">
                        {review.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-4">
                            <Avatar className="h-8 w-8">
                              <img src={reply.avatar} alt={reply.user} />
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm">{reply.user}</h4>
                                <time className="text-xs text-muted-foreground">
                                  {new Date(reply.date).toLocaleDateString()}
                                </time>
                              </div>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                {reply.comment}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}