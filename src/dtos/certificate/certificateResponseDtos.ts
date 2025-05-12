import type { Certificate } from "@prisma/client";

declare global {
  type CertificateDetailResponseDto = {
    id: number;
    name: string | null;
    thumbnailUrl: string;
  };
}

function createDetail(certificate: Certificate): CertificateDetailResponseDto {
  return {
    id: certificate.id,
    name: certificate.name,
    thumbnailUrl: certificate.thumbnailUrl
  }
}

export { createDetail as createCertificateDetailResponseDto };
