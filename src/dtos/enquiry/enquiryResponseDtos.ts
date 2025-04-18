declare global {
  type EnquiryResponseDto = {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    content: string;
    receivedDateTime: string;
    isCompleted: boolean;
  };
}

export { };