// routes/reviewRouter.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Создание нового отзыва
router.post('/reviews', reviewController.createReview);

// Получение всех отзывов
router.get('/reviews', reviewController.getAllReviews);

// Получение одного отзыва по ID
router.get('/reviews/:id', reviewController.getReviewById);

// Обновление отзыва по ID
router.put('/reviews/:id', reviewController.updateReview);

// Удаление отзыва по ID
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;