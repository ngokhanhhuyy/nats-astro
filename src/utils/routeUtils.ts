import { CatalogItemType } from "@/enums/catalogItemType";

export const getPublicHomeRoutePath = () => "/trang-chu";
export const getPublicAboutUsIntroductionRoutePath = () => "/ve-chung-toi";
export const getPublicSummaryItemsRoutePath = (id?: number): string => {
	if (id != null) {
		return `/gioi-thieu?id=${id}`;
	}

	return "/gioi-thieu";
};
export const getPublicServiceListRoutePath = () => "/dich-vu";
export const getPublicServiceDetailRoutePath = (id: number) => `/dich-vu/${id}`;
export const getPublicCourseListRoutePath = () => "/khoa-hoc";
export const getPublicCourseDetailRoutePath = (id: number) => `/khoa-hoc/${id}`;
export const getPublicProductListRoutePath = () => "/san-pham";
export const getPublicProductDetailRoutePath = (id: number) => `/san-pham/${id}`;
export const getPublicContactsRoutePath = () => "/lien-he";
export const getPublicEnquiryRoutePath = () => "/cau-hoi";

export const getSignInRoutePath = () => "/dang-nhap";
export const getProtectedDashboardRoutePath = () => "/quan-tri/bang-dieu-khien";
export const getProtectedContentRoutePath = () => "/quan-tri/noi-dung";
export const getProtectedSliderItemCreateRoutePath = () => {
	return "/quan-tri/noi-dung/trinh-chieu-anh";
};

export const getProtectedSliderItemUpdateRoutePath = (id: number) => {
	return `/quan-tri/noi-dung/trinh-chieu-anh/${id}`;
};

export const getProtectedSummaryItemUpdateRoutePath = (id: number) => {
	return `/quan-tri/noi-dung/gioi-thieu/${id}`;
};

export const getProtectedAboutUsIntroductionUpdateRoute = () => {
	return "/quan-tri/noi-dung/ve-chung-toi";
};

export const getProtectedMemberCreateRoutePath = () => "/quan-tri/noi-dung/doi-ngu";
export const getProtectedMemberUpdateRoutePath = (id: number) => {
	return `/quan-tri/noi-dung/doi-ngu/${id}`;
};

export const getProtectedCertificateCreateRoutePath = () => "/quan-tri/noi-dung/chung-chi";
export const getProtectedCertificateUpdateRoutePath = (id: number) => {
	return `/quan-tri/noi-dung/chung-chi/${id}`;
};

export const getProtectedCatalogItemCreateRoutePath = (type: CatalogItemType) => {
	return `/quan-tri/noi-dung/catalog?type=${type}`;
};
export const getProtectedCatalogItemUpdateRoutePath = (id: number) => {
	return `/quan-tri/noi-dung/catalog/${id}`;
};