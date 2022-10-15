import mongoose from 'mongoose';

export interface ProductDocument extends mongoose.Document {
  title: string;
  slug: string;
  description: string;
  richDescription: string;
  images: Array<string>;
  price: number;
  quantity: number;
  sold: number;
  shipping: string;
  colors: Array<string>;
  brand: Array<string>;
  ratings: Array<object>;
  tags: Array<string>;
  warranty: number;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'product title is required'],
      maxLength: [100, 'Title must shorter then 100 charcters'],
      text: true,
    },
    slug: {
      type: String,
      required: true,
      text: true,
      unique: true,
    },

    description: {
      type: String,
      required: [true, 'description is required'],
    },

    richDescription: {
      type: String,
    },

    images: {
      type: Array,
      required: [true, 'product image is required'],
      min: [1, 'Product must have one picture'],
      max: [6, 'Product must have less them 6 pictures'],
    },

    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
      maxLength: 32,
    },

    quantity: {
      type: Number,
      required: [true, 'product quantity is required'],
    },

    sold: Number,

    shipping: {
      type: String,
      enum: ['yes', 'no'],
      default: 'no',
    },

    colors: {
      type: Array,
    },

    brand: {
      type: Array,
    },

    ratings: [
      {
        starts: Number,
        postedBy: mongoose.Schema.Types.ObjectId,
      },
    ],

    tags: {
      type: Array,
    },

    warranty: {
      type: Number,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },

    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
      },
    ],
  },

  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;