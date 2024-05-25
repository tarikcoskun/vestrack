export const getGenreEmoji = (genre: string): string => {
  switch (genre) {
    case "action":
      return "💥";
    case "adventure":
      return "🗺️";
    case "animation":
      return "👾";
    case "comedy":
      return "😆";
    case "crime":
      return "🔪";
    case "documentary":
      return "📁";
    case "drama":
      return "🎭";
    case "family":
      return "👪";
    case "fantasy":
      return "🔮";
    case "history":
      return "🏛️";
    case "horror":
      return "😱";
    case "music":
      return "🎵";
    case "mystery":
      return "🔍";
    case "romance":
      return "💘";
    case "science-fiction":
      return "🚀";
    case "thriller":
      return "😨";
    case "war":
      return "⚔️";
    case "western":
      return "🌵";
    default:
      return "";
  }
};

export default getGenreEmoji;
