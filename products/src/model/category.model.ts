import mongoose from 'mongoose';
import slugify from 'slugify';

export interface CategoryDocument extends mongoose.Document {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lower: true,
    },
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

categorySchema.set('autoIndex', false);

categorySchema.pre('save', function (done) {
  const cat = this as CategoryDocument;
  const slug = slugify(cat.name, { lower: true });
  cat.slug = slug;
  done();
});

const Category = mongoose.model<CategoryDocument>('Category', categorySchema);

export default Category;
