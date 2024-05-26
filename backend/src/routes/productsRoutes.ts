import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const {
    offset: offsetString,
    limit: limitString,
    productName,
    category,
    filters: filtersString,
    ids: idsString
  } = req.query as {
    offset: string;
    limit: string;
    productName: string;
    category: string;
    filters: string;
    ids: string;
  };

  let ids: number[] = [];
  let offset: number = 0;
  let limit: number | undefined;
  let filters: any = {};

  // Parse filters
  if (filtersString && filtersString !== '') {
    try {
      filters = JSON.parse(filtersString);
    } catch (error) {
      return res.status(400).send({ message: 'Invalid filters JSON format' });
    }
  }

  // Parse IDs
  if (idsString && idsString !== '') {
    try {
      ids = JSON.parse(idsString);
      if (!Array.isArray(ids)) {
        throw new Error('IDs must be an array');
      }
    } catch (error) {
      return res.status(400).send({ message: 'Invalid product IDs format' });
    }
  }

  // Parse offset
  try {
    offset = parseInt(offsetString) || 0;
    if (isNaN(offset)) {
      throw new Error('Offset must be a number');
    }
  } catch (error) {
    return res.status(400).send({ message: 'Offset must be a number' });
  }

  // Parse limit
  try {
    limit = parseInt(limitString) || ids.length;
    if (isNaN(limit)) {
      throw new Error('Limit must be a number');
    }
  } catch (error) {
    return res.status(400).send({ message: 'Limit must be a number' });
  }

  if (isNaN(offset) && isNaN(limit)) {
    return res
      .status(400)
      .send({ message: 'Offset and limit must be numbers' });
  }

  if (offset < 0 || limit < 0) {
    return res
      .status(400)
      .send({ message: 'Offset and limit must not be negative' });
  }

  const productRepository = AppDataSource.getRepository(Product);

  const queryBuilder = productRepository.createQueryBuilder('product');

  if (idsString && idsString.trim() !== '') {
    queryBuilder.andWhereInIds(ids);
  }

  if (filters) {
    if (filters.fromDate && filters.toDate) {
      const fromDate = new Date(filters.fromDate);
      const toDate = new Date(filters.toDate);
      queryBuilder.andWhere(
        'product.release_date BETWEEN :fromDate AND :toDate',
        {
          fromDate,
          toDate
        }
      );
    }
    if (!isNaN(filters.minPrice) && !isNaN(filters.maxPrice)) {
      console.log('filters', filters);

      const minPrice = Number(filters.minPrice);
      const maxPrice = Number(filters.maxPrice);
      queryBuilder.andWhere(
        'product.product_price BETWEEN :minPrice AND :maxPrice',
        {
          minPrice,
          maxPrice
        }
      );
    }
    if (!isNaN(filters.ratingAbove)) {
      const ratingAbove = Number(filters.ratingAbove);
      queryBuilder.andWhere(
        'product.product_rating BETWEEN :ratingAbove AND 5',
        {
          ratingAbove
        }
      );
    }
  }

  if (category && category.trim() !== '') {
    queryBuilder.andWhere('product.product_category ILIKE :category', {
      category: `%${category}%`
    });
  }

  if (productName && productName.trim() !== '') {
    queryBuilder.andWhere('product.product_name ILIKE :productName', {
      productName: `%${productName}%`
    });
  }

  const count = await queryBuilder.getCount();

  const products = await queryBuilder
    .orderBy('product.id', 'ASC')
    .skip(offset)
    .take(limit)
    .getMany();

  return res.json({ products, count });
});

router.get('/all', async (req: Request, res: Response) => {
  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find();
  return res.json(products);
});

router.get('/one/:productId', async (req: Request, res: Response) => {
  const productRepository = AppDataSource.getRepository(Product);

  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await productRepository.findOneBy({ id: productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Error fetching product' });
  }
});

router.get('/categories', async (req: Request, res: Response) => {
  const productRepository = AppDataSource.getRepository(Product);
  const queryBuilder = productRepository.createQueryBuilder('product');
  const categoriesRaw = await queryBuilder
    .select(`DISTINCT product.product_category`)
    .getRawMany();

  const categories = categoriesRaw.map(value => value['product_category']);
  return res.json(categories);
});

export default router;
