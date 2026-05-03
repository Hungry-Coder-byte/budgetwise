import React from 'react';
import { useApi } from '../../src/api/client';
import { Category } from '../../src/types/Category';
import { zodResolver } from 'zod-express-route';
import { z } from 'zod';

interface CategoriesPageProps {
  categories: Category[];
}

const CategoriesSchema = z({
  name: z.string().min(3, 'Category name must be at least 3 characters long'),
}).resolveType<z.inferType<z.object({ name: z.string().min(3, 'Category name must be at least 3 characters long') })>>;

const CategoriesPage: React.FC<CategoriesPageProps> = ({ categories }) => {
  const { getCategories } = useApi();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, [getCategories]);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;