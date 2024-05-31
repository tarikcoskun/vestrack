export function getGenreEmoji(genre: string): string {
  switch (genre) {
    case "action":
    case "action-adventure":
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
    case "sci-fi-fantasy":
      return "🔮";
    case "history":
      return "🏛️";
    case "horror":
      return "😱";
    case "kids":
      return "🎈";
    case "music":
      return "🎵";
    case "mystery":
      return "🔍";
    case "news":
      return "📰";
    case "romance":
      return "💘";
    case "science-fiction":
      return "🚀";
    case "talk":
      return "🎙️";
    case "thriller":
      return "😨";
    case "war":
    case "war-politics":
      return "⚔️";
    case "western":
      return "🌵";
    default:
      return "";
  }
}

export default getGenreEmoji;
