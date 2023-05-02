import plantSource from './services/plantSource';

const testSearch = async () => {
  const searchTerm = 'rose';
  const results = await plantSource.searchPlants(searchTerm);
  console.log('Test Search Results:', results);
};

testSearch();
