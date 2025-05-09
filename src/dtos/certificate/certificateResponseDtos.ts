import type { Certificate } from "@prisma/client";

declare global {
  type CertificateResponseDto = {
    id: number;
    name: string | null;
    thumbnailUrl: string;
  };
}

function createCertificateResponseDto(certificate: Certificate): CertificateResponseDto {
  return {
    id: certificate.id,
    name: certificate.name,
    thumbnailUrl: certificate.thumbnailUrl
  }
}

export { createCertificateResponseDto };
