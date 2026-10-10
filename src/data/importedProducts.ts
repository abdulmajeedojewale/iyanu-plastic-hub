import type { Product } from '../types';
import rawImported from './importedProducts.json';

export const IMPORTED_PRODUCTS: Product[] = rawImported as Product[];
