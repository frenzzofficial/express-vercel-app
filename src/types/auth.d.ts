export interface SignupRequestBody {
  email?: string;
  password?: string;
  fullname?: string;
  terms?: boolean;
}

export interface AuthUserResponse {
  id: string;
  email: string;
  fullname: string;
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
