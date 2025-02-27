import { authInstance } from './@core/instance';

// TIL 변환 응답 타입
export interface TilConvertResponse {
  message: string;
  data: {
    markdown: string;
  } | null;
}

/**
 * TIL 내용을 마크다운으로 변환하는 API
 * @param content 변환할 TIL 내용
 * @returns 변환된 TIL 제목과 마크다운 내용
 */
export const convertTil = async (content: string): Promise<TilConvertResponse> => {
  try {
    // 인증이 필요한 요청이므로 authInstance 사용
    const response = await authInstance.post<TilConvertResponse>('/til/convert', { content });
    return response.data;
  } catch (error: any) {
    // Axios 에러 처리
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        throw new Error('잘못된 요청입니다. 내용을 확인해주세요.');
      } else if (status === 401) {
        throw new Error('인증이 필요합니다. 로그인 후 다시 시도해주세요.');
      } else if (status === 500) {
        throw new Error('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
    throw new Error('TIL 변환 중 오류가 발생했습니다.');
  }
};