import { authInstance } from "./@core/instance";

/**
 * GitHub TIL 업로드를 위한 타입 정의
 */
export interface GitHubUploadRequest {
  repository: string;
  file_name: string;
  content: string;
}

export interface GitHubUploadResponse {
  message: string;
  data: {
    id: number;
    github_id: string;
    email: string;
    avatar_url: string;
  } | null;
}

/**
 * TIL 내용을 GitHub 저장소에 업로드하는 함수
 * @param data 업로드할 TIL 데이터
 * @returns 응답 데이터
 */
export const uploadTilToGitHub = async (data: GitHubUploadRequest): Promise<GitHubUploadResponse> => {
  try {
    const response = await authInstance.post<GitHubUploadResponse>('/upload/github', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 응답이 왔지만 에러 상태코드인 경우
      const { status, data } = error.response;
      
      if (status === 401) {
        throw new Error('인증에 실패했습니다. 다시 로그인해주세요.');
      } else if (status === 422) {
        throw new Error('저장소 URL이 올바르지 않습니다. 다시 확인해주세요.');
      } else if (status === 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      
      // 기타 에러인 경우 서버에서 보낸 메시지 사용
      throw new Error(data?.message || '업로드 중 오류가 발생했습니다.');
    }
    
    // 네트워크 오류 등으로 응답이 없는 경우
    throw new Error('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
  }
};