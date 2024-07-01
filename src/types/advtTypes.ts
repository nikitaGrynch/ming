export type AdvtType = {
  id: string;
  title: string;
  authorId: string;
  category: string;
  animalType: string;
  city: string;
  date: Date;
  description: string;
  image: string;
  price: string;
};

export type AddAdvtType = {
  authorId: string;
  title: string;
  description: string;
  price: string;
  category: string;
  animalType: string;
  city: string;
};

export type SavedAdvtType = {
  id: string;
  advtId: string;
  userId: string;
};

export enum AdvtCategory {
  living = "Проживання",
  walking = "Прогулянка",
  oneTimeService = "Одноразова послуга",
}

export enum AnimalType {
  dog = "Собака",
  cat = "Кіт",
  other = "Інше",
}
