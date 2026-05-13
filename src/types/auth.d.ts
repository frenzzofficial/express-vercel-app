export interface SignupRequestBody {
  email?: string;
  password?: string;
  name?: string;
}

export interface AuthUserResponse {
  id: string;
  email: string;
  name: string;
}

export interface SuccessResponse {
  success: true;

  message: string;

  data: {
    user: AuthUserResponse;
  };
}

export interface ErrorResponse {
  success: false;

  message: string;
}

export type SignupResponse = SuccessResponse | ErrorResponse;
