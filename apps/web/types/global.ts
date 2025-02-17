export type ImageState = {
  data: string | ArrayBuffer | null;
  name: string;
};

export type ImageUploaderCallback = {
  data: string;
  name: string;
  size: number;
};

export type OtpFormProps = {
  resend: (userEmail: string) => Promise<void>;
  isLoadingResend: boolean;
  submit: (userEmail: string, pin: string) => Promise<void>;
  isLoadingSubmit: boolean;
};
