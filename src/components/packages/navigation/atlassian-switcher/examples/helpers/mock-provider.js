import asDataProvider from '../../src/providers/as-data-provider';
const SOME_STATIC_DATA = {
    data: 'yay!',
};
export default asDataProvider('mock', () => Promise.resolve(SOME_STATIC_DATA));
