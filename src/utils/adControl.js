let adBannerInitialized = false;

export const isBannerInitialized = () => adBannerInitialized;
export const markBannerInitialized = () => {
  adBannerInitialized = true;
};
