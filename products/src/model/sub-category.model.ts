import mongoose from 'mongoose';
import slugify from 'slugify';

export interface SubCategoryDocument extends mongoose.Document {
  name: string;
  slug: string;
}

const subCategorySchema = new mongoose.Schema(
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

subCategorySchema.pre('save', async function (done) {
  const subCat = this as SubCategoryDocument;
  const slug = slugify(subCat.name, { lower: true });
  subCat.slug = slug;
  done();
});

const SubCategory = mongoose.model<SubCategoryDocument>(
  'SubCategory',
  subCategorySchema
);

export default SubCategory;
