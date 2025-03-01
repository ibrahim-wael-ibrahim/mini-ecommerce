const fixImageUrl = (image) => {
  if (image.startsWith("storage"))
    return `http://test-ecomerce.xn--hrt-w-ova.de/${image}`;
  if (image.startsWith("http")) return image;
  return `/images/${image}`;
};
export default fixImageUrl;
