import { createProvider, ExportedDataProvider } from './create-data-provider';
import { AvailableProductsResponse } from '../types';

const DEFAULT_AVAILABLE_PRODUCTS_ENDPOINT =
  '/gateway/api/worklens/api/available-products';

export const createAvailableProductsProvider = (
  url = DEFAULT_AVAILABLE_PRODUCTS_ENDPOINT,
)=> {
  return createProvider('availableProducts', url);
};
