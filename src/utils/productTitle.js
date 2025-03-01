export default function ProductTitle(title, locale) {
  // Ensure the title is split into an array of words.
  const titleParts = title ? title.split(" ") : [];

  let separatePart = "";
  let joinedPart = "";

  if (locale === "en") {
    // For English:
    // - separatePart: last word (e.g. "Chair")
    // - joinedPart: remaining words joined by space (e.g. "Baltsar Ikea")
    separatePart = titleParts[titleParts.length - 1] || "";
    joinedPart = titleParts.slice(0, titleParts.length - 1).join(" ");
  } else if (locale === "ar") {
    // For Arabic:
    // - separatePart: first word (e.g. "Baltsar")
    // - joinedPart: remaining words joined by space (e.g. "Ikea Chair")
    separatePart = titleParts[0] || "";
    joinedPart = titleParts.slice(1).join(" ");
  } else {
    // If locale is not recognized, return the full title as joinedPart.
    joinedPart = title;
  }

  return { separatePart, joinedPart };
}
