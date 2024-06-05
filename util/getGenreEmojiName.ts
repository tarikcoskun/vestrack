export function getGenreEmojiName(genre: string) {
  switch (genre) {
    case "action":
    case "action-adventure":
      return "collision";
    case "adventure":
      return "world-map";
    case "animation":
      return "alien-monster";
    case "comedy":
    case "soap":
      return "laughing-face";
    case "crime":
      return "knife";
    case "documentary":
      return "folder";
    case "drama":
      return "arts";
    case "family":
      return "family";
    case "fantasy":
    case "sci-fi-fantasy":
      return "dragon";
    case "history":
      return "classical-building";
    case "horror":
      return "screaming-face";
    case "kids":
      return "balloon";
    case "music":
      return "musical-note";
    case "mystery":
      return "magnifying-glass";
    case "news":
      return "newspaper";
    case "reality":
      return "globe";
    case "romance":
      return "revolving-hearts";
    case "science-fiction":
      return "rocket";
    case "talk":
      return "classical-microphone";
    case "thriller":
      return "fearful-face";
    case "war":
    case "war-politics":
      return "crossed-swords";
    case "western":
      return "cactus";
    default:
      return "";
  }
}
