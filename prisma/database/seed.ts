import { ContactType, Prisma, PrismaClient } from "@prisma/client";
import {
  ThumbnailType as PrismaThumbnailType,
  CatalogItemType as PrismaCatalogItemType } from "@prisma/client";
import type { CatalogItem, SummaryItem, Member } from "@prisma/client"
import bcrypt from "bcrypt";
import { fakerVI as faker } from "@faker-js/faker";
import { EOL } from "os";

type PrismaTransactionalClient = Prisma.TransactionClient;

const prisma = new PrismaClient();

async function generateUsersAsync(transaction: PrismaTransactionalClient): Promise<void> {
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
        { thumbnailUrl: "https://iili.io/3NgfAQ9.jpg", index: 0 },
        { thumbnailUrl: "https://iili.io/3NgJekP.png", index: 1 },
      ]
    });
  }
}

async function generateSummaryItemsAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.summaryItem.count()) {
    const items: Pick<SummaryItem, "name" | "thumbnailUrl">[] = [
      { name: "Trị liệu cột sống", thumbnailUrl: "https://iili.io/3kDaR6l.png" },
      { name: "Đả thông kinh lạc", thumbnailUrl: "https://iili.io/3kD06cQ.png" },
      { name: "Thải độc tế bào", thumbnailUrl: "https://iili.io/3kDE7pI.png" },
      { name: "Nhân số học & Tỉnh thức", thumbnailUrl: "https://iili.io/3kDMfx1.png" }
    ];

    await transaction.summaryItem.createMany({
      data: items.map((item) => ({
        name: item.name,
        summaryContent: faker.lorem.sentences({ min: 2, max: 3 }),
        detailContent: faker.lorem.paragraphs({ min: 3, max: 5 }),
        thumbnailUrl: item.thumbnailUrl,
      }))
    })
  }
}

async function generateAboutUsIntroductionAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.aboutUsIntroduction.count()) {
    const generateParagraphs = () => faker.lorem.paragraphs({ min: 3, max: 5 });
    await transaction.aboutUsIntroduction.create({
      data: {
        thumbnailUrl: "https://iili.io/3NEKhgV.jpg",
        thumbnailType: PrismaThumbnailType.Photo,
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
    const members: Pick<Member, "fullName" | "roleName" | "thumbnailUrl">[] = [
      {
        fullName: "Đỗ Quang Huyền",
        roleName: "Giám đốc",
        thumbnailUrl: "https://iili.io/3kmvtWb.png"
      },
      {
        fullName: "Trang Nguyễn",
        roleName: "Phó giám đốc / Giảng viên",
        thumbnailUrl: "https://iili.io/3kmSX9I.png"
      },
      {
        fullName: "Lan Nguyễn",
        roleName: "Giám đốc chi nhánh Trà Vinh",
        thumbnailUrl: "https://iili.io/3kmUvzF.png"
      },
      {
        fullName: "Trần Kim Khoa",
        roleName: "Giám đốc chi nhánh Trà Vinh",
        thumbnailUrl: "https://iili.io/3kmgWhX.png"
      },
    ];

    await transaction.member.createMany({
      data: members.map((member) => ({
        fullName: member.fullName,
        roleName: member.roleName,
        description: faker.lorem.sentences({ min: 3, max: 5 }),
        thumbnailUrl: member.thumbnailUrl
      }))
    });
  }
}

async function generateCertificatesAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.certificate.count()) {
    await transaction.certificate.create({
      data: { name: "Quyết định Thành lập", thumbnailUrl: "https://iili.io/38kpTf2.png" }
    });
  }
}

async function generateCatalogItemsAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.catalogItem.count()) {
    type CatalogItemData = Pick<CatalogItem, "name" | "type" | "summary"> & {
      thumbnailUrl?: string;
    };

    const catalogItems: CatalogItemData[] = [
      {
        name: "Khóa Học Nghệ Thuật Trang Điểm Chuyên Nghiệp",
        type: PrismaCatalogItemType.Course,
        summary: [
          "Khóa học này tập trung vào việc chăm sóc và điều trị da, bao  gồm các phương pháp",
          "làm sạch da, massage, và các liệu pháp chăm sóc da mặt chuyên sâu."
        ].join(" "),
      },
      {
        name: "Lớp Học Chăm Sóc Da Toàn Diện",
        type: PrismaCatalogItemType.Course,
        summary: [
          "Chương trình này cung cấp các kỹ năng cần thiết về trang điểm từ cơ bản đến nâng",
          "cao, giúp học viên trở thành chuyên gia trang điểm chuyên nghiệp."
        ].join(" ")
      },
      {
        name: "Chương Trình Đào Tạo Nghệ Thuật Làm Tóc",
        type: PrismaCatalogItemType.Course,
        summary: [
          "Dành cho những ai muốn trở thành nhà tạo mẫu tóc chuyên nghiệp, chương trình này",
          "bao gồm cắt, nhuộm, tạo kiểu tóc và các kỹ thuật làm tóc khác."
        ].join(" ")
      },
      {
        name: "Khóa Học Nail Nghệ Thuật và Thiết Kế",
        type: PrismaCatalogItemType.Course,
        summary: [
          "Cung cấp kiến thức và kỹ năng từ cơ bản đến nâng cao trong lĩnh vực làm nail, bao",
          "gồm vẽ nail, phủ gel, và thiết kế nail nghệ thuật.",
        ].join(" ")
      },
      {
        name: "Dịch vụ massage toàn thân",
        type: PrismaCatalogItemType.Service,
        summary: [
          "Dùng các kỹ thuật massage truyền thống kết hợp với tinh dầu tự nhiên để thư giãn",
          "cơ, bắp, giảm stress và cải thiện lưu thông máu."
        ].join(" "),
        thumbnailUrl: "https://iili.io/3kDtjHJ.png"
      },
      {
        name: "Liệu pháp da mặt chống lão hóa",
        type: PrismaCatalogItemType.Service,
        summary: [
          "Sử dụng các sản phẩm chăm sóc da cao cấp và công nghệ tiên tiến để giảm thiểu các",
          "dấu hiệu lão hóa, làm mờ nếp nhăn, và tái tạo làn da."
        ].join(" "),
        thumbnailUrl: "https://iili.io/3kDpB07.png"
      },
      {
        name: "Dịch vụ tắm trắng toàn thân",
        type: PrismaCatalogItemType.Service,
        summary: [
          "Kết hợp giữa tắm hơi và sử dụng hỗn hợp tinh chất tự nhiên giúp làm sáng da, mờ",
          "vết thâm và cung cấp dưỡng chất."
        ].join(" "),
        thumbnailUrl: "https://iili.io/3kbkjbs.png"
      },
      {
        name: "Dịch vụ chăm sóc móng tay/móng chân",
        type: PrismaCatalogItemType.Service,
        summary: [
          "Cung cấp dịch vụ làm sạch, tạo hình, và sơn móng chuyên nghiệp, kèm theo liệu pháp",
          "dưỡng ẩm cho da tay/da chân và massage nhẹ nhàng.",
        ].join(" "),
        thumbnailUrl: "https://iili.io/3kb8uAF.png"
      },
    ];

    await transaction.catalogItem.createMany({
      data: catalogItems.map((item, index) => {
        return {
          name: item.name,
          type: item.type,
          summary: item.summary,
          detail: [5, 8, 10].map(count => faker.lorem.paragraph(count)).join(EOL),
          thumbnailUrl: item.thumbnailUrl ?? null
        };
      })
    });
  }
}

async function generateContactsAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.contact.count()) {
    await transaction.contact.createMany({
      data: [
        { type: ContactType.PhoneNumber, content: "0914640979" },
        { type: ContactType.ZaloNumber, content: "0914640979" },
        { type: ContactType.Email, content: "thammyquocgia@gmail.com" },
        {
          type: ContactType.Address,
          content: "21 Phan Đăng Lưu, phường Tân An, thành phố Buôn Ma Thuột, tỉnh Đắk Lắk"
        }
      ]
    });
  }
}

async function generateGeneralSettingsAsync(transaction: PrismaTransactionalClient) {
  if (!await transaction.generalSettings.count()) {
    await transaction.generalSettings.create({
      data: {
        applicationName: "Trung tâm Khoa học Đào tạo và Thẩm mỹ Quốc Gia",
        applicationShortName: "NATS",
        isUnderMaintainance: false
      }
    });
  }
}

export async function main() {
  await prisma.$transaction(async (transaction) => {
    await generateUsersAsync(transaction);
    await generateUserPermissionsAsync(transaction);
    await generateSliderItemsAsync(transaction);
    await generateSummaryItemsAsync(transaction);
    await generateAboutUsIntroductionAsync(transaction);
    await generateMembersAsync(transaction);
    await generateCertificatesAsync(transaction);
    await generateCatalogItemsAsync(transaction);
    await generateContactsAsync(transaction);
    await generateGeneralSettingsAsync(transaction);
  });
}

main().catch(error => console.error(error)).finally(async () => await prisma.$disconnect());