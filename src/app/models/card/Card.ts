export interface Card {
  imageUrl: string;
  englishTitle: string;
  translationPersianTitle: string;
  englishVoice: string;
  isFavorite: boolean;
  id: number;
  categoryId: number;
  categoryTitle: string;
}