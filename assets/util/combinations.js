let combinations = [
  {
    en: [
      {
        os: 'android',
        baseLang: 'en',
        toLang: ['fr', 'es', 'it', 'de', 'pt', 'ru']
      },

      {
        os: 'ios',
        baseLang: 'en',
        toLang: ['fr', 'es', 'it', 'de', 'pt', 'ru']
      }
    ]
  },
  {
    fr: [
      {
        os: 'android',
        baseLang: 'fr',
        toLang: ['en', 'es', 'it', 'de', 'pt', 'ru']
      },

      {
        os: 'ios',
        baseLang: 'fr',
        toLang: ['en', 'es', 'it', 'de', 'pt', 'ru']
      }
    ]
  },
  {
    es: [
      {
        os: 'android',
        baseLang: 'es',
        toLang: ['en', 'fr', 'it', 'de', 'pt', 'ru']
      },

      {
        os: 'ios',
        baseLang: 'es',
        toLang: ['en', 'fr', 'it', 'de', 'pt', 'ru']
      }
    ]
  },
  {
    it: [
      {
        os: 'android',
        baseLang: 'it',
        toLang: ['en', 'fr', 'es', 'de', 'pt', 'ru']
      },

      {
        os: 'ios',
        baseLang: 'it',
        toLang: ['en', 'fr', 'es', 'de', 'pt', 'ru']
      }
    ]
  },
  {
    de: [
      {
        os: 'android',
        baseLang: 'de',
        toLang: ['en', 'fr', 'es', 'it', 'pt', 'ru']
      },

      {
        os: 'ios',
        baseLang: 'de',
        toLang: ['en', 'fr', 'es', 'it', 'pt', 'ru']
      }
    ]
  },
  {
    pt: [
      {
        os: 'android',
        baseLang: 'pt',
        toLang: ['en', 'fr', 'es', 'it', 'de', 'ru']
      },

      {
        os: 'ios',
        baseLang: 'pt',
        toLang: ['en', 'fr', 'es', 'it', 'de', 'ru']
      }
    ]
  },
  {
    ru: [
      {
        os: 'android',
        baseLang: 'ru',
        toLang: ['en', 'fr', 'es', 'it', 'de', 'pt']
      },

      {
        os: 'ios',
        baseLang: 'ru',
        toLang: ['en', 'fr', 'es', 'it', 'de', 'pt']
      }
    ]
  }
]

module.exports = {
  combinations: combinations
}
