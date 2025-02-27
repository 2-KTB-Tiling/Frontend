// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 사용자 타입 정의
export interface User {
  id: number;
  github_id: string;
  email: string;
  avatar_url: string;
}

// 인증 컨텍스트 상태 타입
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

// 인증 컨텍스트 타입
interface AuthContextType {
  authState: AuthState;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// 기본 인증 상태
const defaultAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null
};

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider 컴포넌트
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  // 로그인 함수
  const login = (token: string, user: User) => {
    setAuthState({
      isAuthenticated: true,
      token,
      user
    });
  };

  // 로그아웃 함수
  const logout = () => {
    setAuthState(defaultAuthState);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅으로 컨텍스트 사용
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};