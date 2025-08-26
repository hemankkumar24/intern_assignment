import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/signin'); 
      } else {
        setLoading(false); 
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <div>Loading...</div>; 

  return children;
};

export default ProtectedRoute;
