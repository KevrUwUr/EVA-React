import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '');
  const [userType, setUserType] = useState(() => localStorage.getItem('userType') || '');
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') || '');
  const [languageUser,setLanguageUser]=useState(()=> localStorage.getItem('languageUser')|| '')
  useEffect(() => {
    const tabCount = sessionStorage.getItem('tabCount');
    sessionStorage.setItem('tabCount', tabCount ? parseInt(tabCount) + 1 : 1);

    if (userId) {
      localStorage.setItem('userId', userId);
    }

    if (userType) {
      localStorage.setItem('userType', userType);
    }

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    
    if (languageUser) {
      localStorage.setItem('languageUser', languageUser);
    }
   
   

    const handleBeforeUnload = () => {
      const tabCount = sessionStorage.getItem('tabCount');
      if (tabCount) {
        const newCount = parseInt(tabCount) - 1;
        sessionStorage.setItem('tabCount', newCount);

        if (newCount === 0) {
          localStorage.removeItem('userId');
          localStorage.removeItem('userType');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('languageUser');
          
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userId,userType,accessToken,languageUser]);

  return (
    <UserContext.Provider value={{ userId, setUserId, userType, setUserType, accessToken, setAccessToken,languageUser,setLanguageUser}}>
      {children}
    </UserContext.Provider>
  );
};



export { UserContext, UserProvider };