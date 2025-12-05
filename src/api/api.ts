export const API_CONFIG = {
  BASE_URL: 'https://dev-api-nurture.vinova.sg/api/v1',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
}

export const API_ENDPOINTS = {
  ADMIN_LOGIN: '/admins/auth/login',
  ADMIN_LOGOUT: '/admins/auth/logout',
  
  ADMIN_ARTICLES: '/admins/articles',
  ADMIN_ARTICLE_BY_ID: (id: string) => `/admins/articles/${id}`,
  
  ADMIN_USERS: '/admins/users',
  ADMIN_USER_BY_ID: (id: string) => `/admins/users/${id}`,
  
  ADMIN_CATEGORIES: '/admins/categories',
  ADMIN_CATEGORY_BY_ID: (id: string) => `/admins/categories/${id}`,
  
  ADMIN_DOULAS: '/admins/doulas',
  ADMIN_DOULA_BY_ID: (id: string) => `/admins/doulas/${id}`,
  
  ADMIN_VOUCHERS: '/admins/vouchers',
  ADMIN_VOUCHER_BY_ID: (id: string) => `/admins/vouchers/${id}`,
  
  ADMIN_REVIEWS: '/admins/reviews',
  ADMIN_REVIEW_BY_ID: (id: string) => `/admins/reviews/${id}`,
  
  ADMIN_SUBSCRIPTIONS: '/admins/subscriptions',
  ADMIN_SUBSCRIPTION_BY_ID: (id: string) => `/admins/subscriptions/${id}`,
  
  ADMIN_STATIC_CONTENT: '/admins/static-contents',
  ADMIN_STATIC_CONTENT_BY_ID: (id: string) => `/admins/static-contents/${id}`,
  
  ADMIN_SETTINGS: '/admins/settings',
  ADMIN_SETTING_BY_ID: (id: string) => `/admins/settings/${id}`,
  
  ADMIN_HELP_DOCUMENTS: '/admins/help-documents',
  ADMIN_HELP_DOCUMENT_BY_ID: (id: string) => `/admins/help-documents/${id}`,
  
  ADMIN_PD_SESSIONS: '/admins/pd-sessions',
  ADMIN_PD_SESSION_BY_ID: (id: string) => `/admins/pd-sessions/${id}`,
  
  ADMIN_SEARCH_SETTINGS: '/admins/search-settings',
  ADMIN_SEARCH_SETTING_BY_ID: (id: string) => `/admins/search-settings/${id}`,
  
  // Public Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_SSO_LOGIN: '/auth/login-by-sso-token',
  AUTH_CHECK_SSO: '/auth/check-exists-sso',
  
  // Public Articles
  ARTICLES: '/articles',
  ARTICLE_BY_SLUG: (slug: string) => `/articles/${slug}`,
  ARTICLE_BY_ID: (id: string) => `/articles/by-id/${id}`,
  ARTICLE_FAVORITE: (id: string) => `/articles/favorite/${id}`,
}
