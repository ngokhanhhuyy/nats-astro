import { CatalogItemType } from "@/enums/catalogItemType";

const routeUtils = {
  getPublicHomeRoutePath: () => "/trang-chu",
  getPublicAboutUsIntroductionRoutePath : () => "/ve-chung-toi",
  getPublicSummaryItemsRoutePath: (id?: number) => {
    if (id != null) {
      return `/gioi-thieu?id=${id}`;
    }

    return "/gioi-thieu";
  },
  getPublicServiceListRoutePath : () => "/dich-vu",
  getPublicServiceDetailRoutePath: (id: number) => `/dich-vu/${id}`,
  getPublicCourseListRoutePath : () => "/khoa-hoc",
  getPublicCourseDetailRoutePath: (id: number) => `/khoa-hoc/${id}`,
  getPublicProductListRoutePath : () => "/san-pham",
  getPublicProductDetailRoutePath: (id: number) => `/san-pham/${id}`,
  getPublicContactsRoutePath : () => "/lien-he",
  getPublicEnquiryRoutePath : () => "/cau-hoi",

  getSignInRoutePath : () => "/dang-nhap",
  getSignOutRoutePath : () => "/dang-xuat",

  getProtectedRoutePath : () => "/quan-tri",
  getProtectedDashboardRoutePath : () => "/quan-tri",

  // Protected - slider items route paths.
  getProtectedSliderItemListRoutePath : () => "/quan-tri/trinh-chieu-anh",
  getProtectedSliderItemCreateRoutePath : () => "/quan-tri/trinh-chieu-anh/tao-moi",
  getProtectedSliderItemUpdateRoutePath: (id: number) => {
    return `/quan-tri/trinh-chieu-anh/${id}/chinh-sua`;
  },

  // Protected - summary items route paths.
  getProtectedSummaryItemListRoutePath : () => "/quan-tri/gioi-thieu",
  getProtectedSummaryItemDetailRoutePath: (id: number) => `/quan-tri/gioi-thieu/${id}`,
  getProtectedSummaryItemUpdateRoutePath: (id: number) => {
    return `/quan-tri/gioi-thieu/${id}/chinh-sua`;
  },

  // Protected - about us introduction route paths.
  getProtectedAboutUsIntroductionDetailRoutePath : () => "/quan-tri/ve-chung-toi",
  getProtectedAboutUsIntroductionUpdateRoutePath : () => "/quan-tri/ve-chung-toi/chinh-sua",

  // Protected - member route paths.
  getProtectedMemberListRoutePath : () => "/quan-tri/doi-ngu",
  getProtectedMemberCreateRoutePath : () => "/quan-tri/doi-ngu/tao-moi",
  getProtectedMemberUpdateRoutePath: (id: number) => `/quan-tri/doi-ngu/${id}/chinh-sua`,

  // Protected - certificate route paths.
  getProtectedCertificateListRoutePath : () => "/quan-tri/chung-chi",
  getProtectedCertificateCreateRoutePath : () => "/quan-tri/chung-chi/tao-moi",
  getProtectedCertificateUpdateRoutePath: (id: number) => {
    return `/quan-tri/chung-chi/${id}/chinh-sua`;
  },

  // Protected - catalog item route paths.
  getProtectedCatalogItemListRoutePath: (type?: CatalogItemType) => {
    const path = "/quan-tri/catalog";
    if (type) {
      return path + `?type=${type}`;
    }

    return path;
  },

  getProtectedCatalogItemCreateRoutePath: (type: CatalogItemType) => {
    return `/quan-tri/catalog/tao-moi?type=${type}`;
  },

  getProtectedCatalogItemDetailRoutePath: (id: number) => {
    return `/quan-tri/catalog/${id}`;
  },

  getProtectedCatalogItemUpdateRoutePath: (id: number) => {
    return `/quan-tri/catalog/${id}/chinh-sua`;
  },

  // Protected - contacts.
  getProtectedContactListRoutePath : () => "/quan-tri/lien-he",
  getProtectedContactDetailRoutePath: (id: number) => `/quan-tri/lien-he/${id}`,
  getProtectedContactCreateRoutePath : () => "/quan-tri/lien-he/tao-moi",
  getProtectedContactUpdateRoutePath: (id: number) => `/quan-tri/lien-he/${id}/chinh-sua`,

  // Protected - enquiries.
  getProtectedEnquiryListRoutePath : () => "/quan-tri/cau-hoi",
  getProtectedEnquiryDetailRoutePath: (id: number) => `/quan-tri/cau-hoi/${id}`,
  getProtectedEnquiryCreateRoutePath : () => "/quan-tri/cau-hoi",
  getProtectedEnquiryUpdateRoutePath: (id: number) => `/quan-tri/cau-hoi/${id}`
}

export function useRouteUtils() {
  return routeUtils;
}