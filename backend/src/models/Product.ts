import sequelize from '../db_connection';
import { Model, DataTypes, Optional } from 'sequelize';

export interface ProductAttributes {
  product_name: string;
  product_description?: string;
  product_category?: string;
  product_price?: number;
  release_date?: Date;
  manufacturer?: string;
  product_rating?: number;
  customer_reviews?: number;
  product_image_url?: string;
  product_website?: string;
}

interface ProductUpdateAttributes {}

interface ProductModel
  extends Model<ProductAttributes, ProductUpdateAttributes>,
    ProductAttributes {}

const Product = sequelize.define<ProductModel>('Products', {
  product_name: {
    type: DataTypes.STRING(50)
  },
  product_description: {
    type: DataTypes.TEXT
  },
  product_category: {
    type: DataTypes.STRING(11)
  },
  product_price: {
    type: DataTypes.DECIMAL(9, 2)
  },
  release_date: {
    type: DataTypes.DATE
  },
  manufacturer: {
    type: DataTypes.STRING(50)
  },
  product_rating: {
    type: DataTypes.DECIMAL(2, 1)
  },
  customer_reviews: {
    type: DataTypes.INTEGER
  },
  product_image_url: {
    type: DataTypes.STRING(50)
  },
  product_website: {
    type: DataTypes.STRING(1000)
  }
});

export default Product;
