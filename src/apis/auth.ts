import { instance } from "./@core/instance";
import axios from "axios";

// 타입 정의
export interface User {
  id: number;
  github_id: string;
  email: string;
  avatar_url: string;
}

export interface AuthResponse {
  message: string;
  data: {
    access_token: string;
    user: User;
  } | null;
}

// 토큰 관리 함수
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};


export const setUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};


// GitHub OAuth 관련 상수
export const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || '';
export const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI || '';
export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email`;

/**
 * GitHub 인증 코드로 로그인을 처리하는 함수
 * @param code GitHub에서 리다이렉트로 받은 인증 코드
 * @returns 인증 응답 객체
 */
export const githubLogin = async (code: string): Promise<AuthResponse> => {
  try {
    console.log('GitHub 인증 요청 시작, 코드:', code); // 인증 코드 로깅
    
    // 요청 직전 정보 로깅
    console.log('API 요청 URL:', `${instance.defaults.baseURL}auth/github`);
    console.log('요청 데이터:', { code });
    
    // 로그인은 인증 토큰이 필요 없으므로 기본 인스턴스 사용
    const response = await instance.post<AuthResponse>('auth/github', { code });
    
    console.log('로그인 응답 성공:', response.data); // 성공 응답 로깅
    
    // 로그인 성공 시 토큰과 사용자 정보 저장
    if (response.data.message === 'login_success' && response.data.data) {
      setToken(response.data.data.access_token);
      setUser(response.data.data.user);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('로그인 에러 발생:'); // 에러 발생 로깅
    
    if (axios.isAxiosError(error)) {
      // HTTP 에러 상세 로깅
      console.error('HTTP 에러 상태:', error.response?.status);
      console.error('에러 응답 데이터:', error.response?.data);
      console.error('요청 URL:', error.config?.url);
      console.error('요청 데이터:', error.config?.data);
      console.error('요청 헤더:', error.config?.headers);
      
      // HTTP 에러 처리
      const statusCode = error.response?.status;
      const responseData = error.response?.data as AuthResponse;
      
      if (statusCode === 400) {
        throw new Error('잘못된 요청입니다.');
      } else if (statusCode === 401) {
        throw new Error('GitHub 인증 코드가 유효하지 않습니다.');
      } else if (statusCode === 500) {
        throw new Error('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
      
      throw new Error(responseData?.message || '인증 처리 중 오류가 발생했습니다.');
    }
    console.error('일반 에러 정보:', error);
    throw new Error('인증 처리 중 오류가 발생했습니다!');
  }
};
