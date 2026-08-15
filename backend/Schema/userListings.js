import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    platform: {
      type: String,
      required: true,
      enum: ["youtube", "instagram", "facebook", "twitter", "tiktok", "other"],
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    followers_count: {
      type: Number,
      required: true,
      min: 0,
    },

    engagement_rate: {
      type: Number,
      required: true,
      min: 0,
    },

    monthly_views: {
      type: Number,
      default: 0,
      min: 0,
    },

    niche: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    monetized: {
      type: Boolean,
      default: false,
    },

    country: {
      type: String,
      required: true,
    },

    age_range: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "sold", "pending", "inactive"],
      default: "active",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    images: [
      {
        type: String,
      },
    ],

    platformAssured: {
      type: Boolean,
      default: false,
    },

    isCredentialSubmitted: {
      type: Boolean,
      default: false,
    },

    isCredentialVerified: {
      type: Boolean,
      default: false,
    },

    isCredentialChanged: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Listing = mongoose.model("Listing", listingSchema);