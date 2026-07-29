const testId = <S extends string>(testid: S) =>
  `[data-testid="${testid}"]` as const

export const SELECTORS = {
  HEADER: {
    SELF: testId('header'),
    LOGO: testId('header-logo'),
    TITLE: testId('header-title'),
    TAGLINE: testId('header-tagline'),
  },
  FEATURE_LIST: {
    SELF: testId('feature-list'),
    CARD: {
      SELF: testId('feature-card'),
      NAME: testId('feature-card-name'),
      STATUS: testId('feature-card-status'),
      DESCRIPTION: testId('feature-card-description'),
    },
    exampleTestIdGetter: (itemId: string) => testId(`feature-card-${itemId}`),
  },
  FOOTER: testId('footer'),
} as const
