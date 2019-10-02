import * as React from 'react';

import { ProviderResult } from './as-data-provider';
import { AvailableProductsResponse } from '../types';
import { createAvailableProductsProvider } from './default-available-products-provider';
import { ExportedDataProvider, DataProvider } from './create-data-provider';



const {
  fetchMethod: fetchAvailableProducts,
  ProviderComponent: DefaultDataProviderComponent,
} = createAvailableProductsProvider() ;

export const AvailableProductsProvider = ({
  children,
  availableProductsDataProvider,
}) => {
  const CustomDataProviderComponent =
    availableProductsDataProvider &&
    availableProductsDataProvider.ProviderComponent;

  const DataProviderComponent =
    CustomDataProviderComponent || DefaultDataProviderComponent;

  return <DataProviderComponent>{children}</DataProviderComponent>;
};

export const prefetchAvailableProducts = (
  customProvider,
) => {
  if (customProvider) {
    (customProvider ).fetchMethod({});
    return;
  }

  fetchAvailableProducts({});
};

export const resetAvailableProducts = (
  customProvider,
) => {
  if (customProvider) {
    (customProvider ).fetchMethod.reset();
    return;
  }

  fetchAvailableProducts.reset();
};
