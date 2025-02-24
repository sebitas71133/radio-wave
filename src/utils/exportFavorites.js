export const exportFavorites = () => {
  const favorites = localStorage.getItem("favorites");

  if (!favorites) {
    console.log("Lista vacia");
    return;
  }

  const favoritesArray = JSON.parse(favorites);
  const formattedText = favoritesArray.join("\n");

  const blob = new Blob([formattedText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "favorites.txt";
  link.click();
  URL.revokeObjectURL(link.href);
};
