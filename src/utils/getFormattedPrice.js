export function getFormattedPriceComponents(price) {
  const formattedPrice = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(price);

  const currencySymbol = formattedPrice.charAt(0);
  const numberValue = formattedPrice.slice(1);

  return [currencySymbol, numberValue];
}
