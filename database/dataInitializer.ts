import { Prisma, PrismaClient, ThumbnailType, CatalogItemType } from "@prisma/client";
import type { CatalogItem as CatalogItemEntity } from "@prisma/client"
import bcrypt from "bcrypt";
import { fakerVI as faker } from "@faker-js/faker";
import { EOL } from "os";

type PrismaTransactionalClient = Prisma.TransactionClient;

const prisma = new PrismaClient();

async function generateUsersAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.user.count()) {
    const hashPasswordAsync = async (password: string) => {
      return await bcrypt.hash(password, 10);
    };

    await transaction.user.createMany({
      data: [
        {
          userName: "ngokhanhhuyy",
          passwordHash: await hashPasswordAsync("huy123"),
        },
        { userName: "ngoanhtai", passwordHash: await hashPasswordAsync("tai123") }
      ]
    });
  }
}

async function generateUserPermissionsAsync(transaction: PrismaTransactionalClient) {
  const permissionCount = await transaction.userPermission.count();
  if (!permissionCount || permissionCount !== await transaction.user.count()) {
    const users = await transaction.user.findMany({
      orderBy: [
        { userName: "asc" }
      ]
    });
    await transaction.userPermission.createMany({
      data: [
        {
          canCreateUser: true,
          canResetUserPassword: true,
          canDeleteUser: true,
          userId: users[0].id,
        },
        {
          canCreateUser: false,
          canResetUserPassword: false,
          canDeleteUser: false,
          userId: users[1].id,
        }
      ]
    });
  }
}

async function generateSliderItemsAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.sliderItem.count()) {
    await transaction.sliderItem.createMany({
      data: [
        { thumbnailUrl: "/upload/images/1.jpg", index: 0 },
        { thumbnailUrl: "/upload/images/3.jpg", index: 1 },
      ]
    });
  }
}

async function generateSummaryItemsAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.summaryItem.count()) {
    const names = [
      "Trị liệu cột sống",
      "Đả thông kinh lạc",
      "Thải độc tế bào",
      "Nhân số học & Tỉnh thức"
    ];

    await transaction.summaryItem.createMany({
      data: names.map((name, index) => ({
        name,
        summaryContent: faker.lorem.sentences({ min: 2, max: 3 }),
        detailContent: faker.lorem.paragraphs({ min: 3, max: 5 }),
        thumbnailUrl: `/upload/images/summaryItem${index + 1}.jpg`,
      }))
    })
  }
}

async function generateAboutUsIntroductionAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.aboutUsIntroduction.count()) {
    const generateParagraphs = () => faker.lorem.paragraphs({ min: 3, max: 5 });
    await transaction.aboutUsIntroduction.create({
      data: {
        thumbnailUrl: "/upload/images/aboutUsIntroduction.jpg",
        thumbnailType: ThumbnailType.Photo,
        mainQuoteContent: faker.lorem.paragraph(5),
        aboutUsContent: generateParagraphs(),
        whyChooseUsContent: generateParagraphs(),
        ourDifferenceContent: generateParagraphs(),
        ourCultureContent: generateParagraphs()
      }
    });
  }
}

async function generateMembersAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.member.count()) {
    const members: { fullName: string, roleName: string }[] = [
      { fullName: "Đỗ Quang Huyền", roleName: "Giám đốc" },
      { fullName: "Trang Nguyễn", roleName: "Phó giám đốc / Giảng viên" },
      { fullName: "Lan Nguyễn", roleName: "Giám đốc chi nhánh Trà Vinh" },
      { fullName: "Trần Kim Khoa", roleName: "Giám đốc chi nhánh Trà Vinh" },
    ];

    await transaction.member.createMany({
      data: members.map((member, index) => ({
        fullName: member.fullName,
        roleName: member.roleName,
        description: faker.lorem.sentences({ min: 3, max: 5 }),
        thumbnailUrl: `/upload/images/${index}`
      }))
    });
  }
}

async function generateCertificatesAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.certificate.count()) {
    await transaction.certificate.create({
      data: { name: "Quyết định Thành lập", thumbnailUrl: "/upload/images/certificate1.jpg" }
    });
  }
}

async function generateCatalogItemsAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.catalogItem.count()) {
    type CatalogItem = { name: string, type: CatalogItemType, summary: string };
    const catalogItems: CatalogItem[] = [
      {
        name: "Khóa Học Nghệ Thuật Trang Điểm Chuyên Nghiệp",
        type: CatalogItemType.Course,
        summary: [
          "Khóa học này tập trung vào việc chăm sóc và điều trị da, bao  gồm các phương pháp",
          "làm sạch da, massage, và các liệu pháp chăm sóc da mặt chuyên sâu."
        ].join(" ")
      },
      {
        name: "Lớp Học Chăm Sóc Da Toàn Diện",
        type: CatalogItemType.Course,
        summary: [
          "Chương trình này cung cấp các kỹ năng cần thiết về trang điểm từ cơ bản đến nâng",
          "cao, giúp học viên trở thành chuyên gia trang điểm chuyên nghiệp."
        ].join(" ")
      },
      {
        name: "Chương Trình Đào Tạo Nghệ Thuật Làm Tóc",
        type: CatalogItemType.Course,
        summary: [
          "Dành cho những ai muốn trở thành nhà tạo mẫu tóc chuyên nghiệp, chương trình này",
          "bao gồm cắt, nhuộm, tạo kiểu tóc và các kỹ thuật làm tóc khác."
        ].join(" ")
      },
      {
        name: "Khóa Học Nail Nghệ Thuật và Thiết Kế",
        type: CatalogItemType.Course,
        summary: [
          "Cung cấp kiến thức và kỹ năng từ cơ bản đến nâng cao trong lĩnh vực làm nail, bao",
          "gồm vẽ nail, phủ gel, và thiết kế nail nghệ thuật.",
        ].join(" ")
      },
      {
        name: "Dịch vụ massage toàn thân",
        type: CatalogItemType.Service,
        summary: [
          "Dùng các kỹ thuật massage truyền thống kết hợp với tinh dầu tự nhiên để thư giãn",
          "cơ, bắp, giảm stress và cải thiện lưu thông máu."
        ].join(" ")
      },
      {
        name: "Liệu pháp da mặt chống lão hóa",
        type: CatalogItemType.Service,
        summary: [
          "Sử dụng các sản phẩm chăm sóc da cao cấp và công nghệ tiên tiến để giảm thiểu các",
          "dấu hiệu lão hóa, làm mờ nếp nhăn, và tái tạo làn da."
        ].join(" ")
      },
      {
        name: "Dịch vụ tắm trắng toàn thân",
        type: CatalogItemType.Service,
        summary: [
          "Kết hợp giữa tắm hơi và sử dụng hỗn hợp tinh chất tự nhiên giúp làm sáng da, mờ",
          "vết thâm và cung cấp dưỡng chất."
        ].join(" ")
      },
      {
        name: "Dịch vụ chăm sóc móng tay/móng chân",
        type: CatalogItemType.Service,
        summary: [
          "Cung cấp dịch vụ làm sạch, tạo hình, và sơn móng chuyên nghiệp, kèm theo liệu pháp",
          "dưỡng ẩm cho da tay/da chân và massage nhẹ nhàng.",
        ].join(" ")
      },
    ];

    await transaction.catalogItem.createMany({
      data: catalogItems.map((item, index): Omit<CatalogItemEntity, "id"> => {
        const typeName = CatalogItemType[CatalogItemType.Service].toLowerCase();
        return {
          name: item.name,
          type: item.type,
          summary: item.summary,
          detail: [5, 8, 10].map(count => faker.lorem.paragraph(count)).join(EOL),
          thumbnailUrl: `/upload/images/${typeName}${index + 1}`
        }
      })
    });
  }
}

export async function generateAsync() {
  await prisma.$transaction(async (transaction) => {
    await generateUsersAsync(transaction);
    await generateUserPermissionsAsync(transaction);
    await Promise.all([
      generateSliderItemsAsync(transaction),
      generateSummaryItemsAsync(transaction),
      generateAboutUsIntroductionAsync(transaction),
      generateMembersAsync(transaction),
      generateCertificatesAsync(transaction),
    ]);
  });
}