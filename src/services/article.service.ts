import { API_ENDPOINTS } from '../api/api'
import { createCrudService } from './base.service'
import type { Article, ArticleFormData } from '../types'

// Sử dụng generic CRUD service factory
const baseService = createCrudService<Article, ArticleFormData>(API_ENDPOINTS.ADMIN_ARTICLES)

export const articleService = {
  getArticles: baseService.getAll,
  getArticleById: baseService.getById,
  createArticle: baseService.create,
  updateArticle: baseService.update,
  deleteArticle: baseService.delete,
  bulkDeleteArticles: baseService.bulkDelete,
}
