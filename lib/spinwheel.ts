const SPINWHEEL_BASE_URL = process.env.NEXT_PUBLIC_SPINWHEEL_BASE_URL || 'https://sandbox-api.spinwheel.io';
const SPINWHEEL_SECURE_URL = process.env.NEXT_PUBLIC_SPINWHEEL_SECURE_URL || 'https://secure-sandbox-api.spinwheel.io';

export interface SpinwheelError {
  error?: string;
  message?: string;
  status?: {
    code: number;
    desc: string;
    messages?: Array<{
      desc: string;
    }>;
  };
}

export interface ConnectUserRequest {
  phoneNumber: string;
  method?: 'sms' | 'pre-verified';
}

export interface ConnectUserResponse {
  userId: string;
  status: string;
}

export interface InitiateSMSRequest {
  phoneNumber: string;
  dateOfBirth: string; // Format: YYYY-MM-DD
  extUserId: string;
}

export interface InitiateSMSResponse {
  status: {
    code: number;
    desc: string;
  };
  data: {
    userId: string;
    extUserId: string;
    connectionId: string;
    connectionStatus: string;
    sms: {
      codeExpiresAt: number;
      codeTimeoutSeconds: number;
    };
  };
}

export interface VerifyOTPRequest {
  userId: string; // The userId from InitiateSMSResponse.data.userId
  code: string;
}

export interface VerifyOTPResponse {
  status: {
    code: number;
    desc: string;
  };
  data?: {
    userId: string;
    extUserId?: string;
    connectionId?: string;
    connectionStatus?: string;
  };
  // Fallback for different response formats
  userId?: string;
}

export interface Liability {
  id: string;
  accountName: string;
  accountNumber?: string;
  accountType: string;
  balance?: number;
  creditLimit?: number;
  minimumPayment?: number;
  dueDate?: string;
  status?: string;
  subtype?: string;
}

export interface DebtProfile {
  userId: string;
  liabilities: Liability[];
  totalBalance?: number;
  lastUpdated?: string;
}

class SpinwheelClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SPINWHEEL_SECRET_KEY || '';
    if (!this.apiKey) {
      console.warn('SPINWHEEL_SECRET_KEY is not set');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${SPINWHEEL_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData: SpinwheelError = await response.json().catch(() => ({
        error: 'Unknown error',
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      
      // Extract error message from Spinwheel's error format
      let errorMessage = 'API request failed';
      
      if (errorData.status?.messages && errorData.status.messages.length > 0) {
        // Use the first message description
        errorMessage = errorData.status.messages[0].desc;
      } else if (errorData.status?.desc) {
        // Fallback to status description
        errorMessage = errorData.status.desc;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  }

  private async secureRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${SPINWHEEL_SECURE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData: SpinwheelError = await response.json().catch(() => ({
        error: 'Unknown error',
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      
      // Extract error message from Spinwheel's error format
      let errorMessage = 'API request failed';
      
      if (errorData.status?.messages && errorData.status.messages.length > 0) {
        // Use the first message description
        errorMessage = errorData.status.messages[0].desc;
      } else if (errorData.status?.desc) {
        // Fallback to status description
        errorMessage = errorData.status.desc;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async connectUser(data: ConnectUserRequest): Promise<ConnectUserResponse> {
    return this.secureRequest<ConnectUserResponse>('/v1/users', {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: data.phoneNumber,
        method: data.method || 'sms',
      }),
    });
  }

  async initiateSMSConnection(data: InitiateSMSRequest): Promise<InitiateSMSResponse> {
    return this.request<InitiateSMSResponse>('/v1/users/connect/sms/', {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        extUserId: data.extUserId,
      }),
    });
  }

  async verifyOTP(data: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    return this.request<VerifyOTPResponse>(`/v1/users/${data.userId}/connect/sms/verify`, {
      method: 'POST',
      body: JSON.stringify({
        code: data.code,
      }),
    });
  }

  async getDebtProfile(userId: string): Promise<DebtProfile> {
    return this.request<DebtProfile>(`/v1/users/${userId}/debt-profile`);
  }
}

export const spinwheelClient = new SpinwheelClient();

