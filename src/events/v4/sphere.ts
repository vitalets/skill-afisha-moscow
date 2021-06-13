export enum Sphere {
  Spectacle = 80299, // Спектакли
  Exibition = 81299, // Выставки
  Excursion = 83299, // Экскурсии
  MasterClass = 239299, // Мастер-классы
  Park = 84299, // События в парках
  Sport = 85299, // Спортивные события
  // not used now!
  // Education = 15299, // Образование
  // Concert = 78299, // Концерты
  // MyDistinct = 231299, // Мой район
  // ForChildren = 305299, // Для детей
}

export const SphereTitle: Record<Sphere, string> = {
  [Sphere.Spectacle]: 'спектакль',
  [Sphere.Exibition]: 'выставка',
  [Sphere.Excursion]: 'экскурсия',
  [Sphere.MasterClass]: 'мастер-класс',
  [Sphere.Park]: 'в парке',
  [Sphere.Sport]: 'спорт',
};

export const SphereTitleMany: Record<Sphere, string> = {
  [Sphere.Spectacle]: 'спектакли',
  [Sphere.Exibition]: 'выставки',
  [Sphere.Excursion]: 'экскурсии',
  [Sphere.MasterClass]: 'мастер-классы',
  [Sphere.Park]: 'события в парках',
  [Sphere.Sport]: 'спорт',
};

export enum Auditorie {
  Children = 2087, // Для детей
  OpenAir = 3087, // На открытом воздухе
}
