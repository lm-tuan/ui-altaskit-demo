import asDataProvider, { DataProviderProps } from './as-data-provider';
import { fetchJson } from '../utils/fetch';
import { withCached, WithCached } from '../utils/with-cached';

/**
 * Some items might be using the type `ExportedDataProvider` instead due to errors with
 * the generated documentation
 */

/**
 * `WithCached` within `DataProvider` breaks the documentation with error:
 * `Error: Missing converter for: TSMappedType` due to usage of Proxy function
 * so we are exporting a simpler type here just for the docs. There has been reported
 * on their repo already: https://github.com/atlassian/extract-react-types/issues/75
 */


export const createProvider = (
  name,
  url,
) => {
  const fetchMethod = withCached((param) => fetchJson(url));

  return {
    fetchMethod,
    ProviderComponent: asDataProvider(name, fetchMethod, fetchMethod.cached),
  };
};
