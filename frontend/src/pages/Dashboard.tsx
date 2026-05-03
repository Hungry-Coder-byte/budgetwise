import React, { useEffect, useState } from 'react';
import { useAuth } from '../../src/hooks/useAuth';
import { useApi } from '../../src/api/client';
import { Income } from '../../src/types/Income';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { user } = useAuth();
  const { getIncome } = useApi();
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const data = await getIncome();
        setIncomeData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch income data');
        setLoading(false);
      }
    };

    fetchIncome();
  }, [getIncome]);

  if (loading) {
    return <div>Loading income data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <h2>Welcome, {user.name}</h2>}
      {incomeData.length > 0 ? (
        <div>
          <h2>Total Income: ${incomeData.reduce((sum, item) => sum + item.amount, 0)}</h2>
          <h3>Recent Income</h3>
          <ul>
            {incomeData.slice(0, 3).map((item) => (
              <li key={item._id}>
                {item.description} - ${item.amount}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No income data found.</div>
      )}
    </div>
  );
};

export default Dashboard;