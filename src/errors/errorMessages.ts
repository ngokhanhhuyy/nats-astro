const errorMessages = {
  invalid(displayName: string): string {
    return `${displayName} không hợp lệ.`;
  },

  required(displayName: string): string {
    return `${displayName} không được để trống.`;
  },

  stringMinLength(displayName: string, length: number): string {
    return `${displayName} phải có độ dài nhiều hơn là ${length} ký tự.`;
  },

  stringMinOrEqualLength(displayName: string, length: number): string {
    return `${displayName} phải có độ dài bằng hoặc nhiều hơn ${length} ký tự`;
  },

  stringMaxLength(displayName: string, length: number): string {
    return `${displayName} phải có độ dài ít hơn ${length} ký tự.`;
  },

  stringMaxOrEqualLength(displayName: string, length: number): string {
    return `${displayName} phải có độ dài bằng hoặc ít hơn ${length} ký tự.`;
  },

  notExists(displayName: string): string {
    return `${displayName} không tồn tại.`;
  },

  incorrect(displayName: string): string {
    return `${displayName} không chính xác.`
  }
};

export function useErrorMessages() {
  return errorMessages;
}