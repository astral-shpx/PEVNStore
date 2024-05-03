import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

const router = Router();

// TODO add query params for searching by name description etc
router.get('/', async (req: Request, res: Response) => {
  const offsetString = req.query.offset as string;
  const limitString = req.query.limit as string;

  const offset = parseInt(offsetString) || 0;
  const limit = parseInt(limitString);

  if (isNaN(offset) || isNaN(limit)) {
    return res
      .status(400)
      .send({ message: 'You must provide offset and limit' });
  }

  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository
    .createQueryBuilder('product')
    .orderBy('product.id', 'ASC')
    .skip(offset)
    .take(limit)
    .getMany();
  return res.json(products);
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

router.get(
  '/search/byname/:productName',
  async (req: Request, res: Response) => {
    const productRepository = AppDataSource.getRepository(Product);
    const { take } = req.body;
    try {
      const productName = req.params.productName;
      if (!productName) {
        return res.status(400).json({ message: 'No product name given' });
      }

      const products = await productRepository
        .createQueryBuilder('product')
        .where('product.product_name ILIKE :productName', {
          productName: `%${productName}%`
        })
        .orderBy('product.id', 'ASC')
        .take(take || 3)
        .getMany();

      if (products.length === 0) {
        return res.status(404).json({ message: 'Products not found' });
      }

      return res.json(products);
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ message: 'Error fetching product' });
    }
  }
);

export default router;
