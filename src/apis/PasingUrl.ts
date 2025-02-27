import { authInstance } from "./@core/instance";

/**
 * GitHub 저장소 URL 파싱을 위한 타입 정의
 */
export interface GithubUrlParseRequest {
  repository_url: string;
}

export interface GithubUrlParseResponse {
  message: string;
  data: {
    owner: string;
    repo: string;
  } | null;
}

/**
 * GitHub 저장소 URL을 파싱하는 함수
 * @param data 파싱할 GitHub 저장소 URL 정보
 * @returns 파싱된 소유자(owner)와 저장소(repo) 정보
 */
export const parseGithubRepositoryUrl = async (data: GithubUrlParseRequest): Promise<GithubUrlParseResponse> => {
  try {
    const response = await authInstance.post<GithubUrlParseResponse>('/parse/github-url', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 응답이 왔지만 에러 상태코드인 경우
      const { status, data } = error.response;
      
      if (status === 400) {
        throw new Error('유효하지 않은 GitHub 저장소 URL입니다. 다시 확인해주세요.');
      } else if (status === 401) {
        throw new Error('인증에 실패했습니다. 다시 로그인해주세요.');
      } else if (status === 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      
      // 기타 에러인 경우 서버에서 보낸 메시지 사용
      throw new Error(data?.message || 'URL 파싱 중 오류가 발생했습니다.');
    }
    
    // 네트워크 오류 등으로 응답이 없는 경우
    throw new Error('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
  }
};