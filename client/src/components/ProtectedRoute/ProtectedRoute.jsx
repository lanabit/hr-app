import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const navigate = useRouter();
  const path = usePathname();

  const authorizeUser = () => {
    let userData = localStorage.getItem('user');
    userData = JSON.parse(userData);

    // Testing route path
    const protectedPath = ['/admin-dashboard', '/dashboard'];
    const protectedPathAdmin = ['/attendance', '/employee'];

    // if (userData?.position != 1 && protectedPathAdmin.includes(path)) {
    //   navigate.push('/login');
    // }
    if (!userData) {
      navigate.push('/login');
    }

    if (userData?.isHRAdmin == false) {
      navigate.push('/dashboard');
    }
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  return <>{children}</>;
}
