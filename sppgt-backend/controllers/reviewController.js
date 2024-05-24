
const { Review } = require('../models/models');

// Создание нового отзыва
exports.createReview = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const newReview = await Review.create({ text });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review', error });
  }
};

// Получение всех отзывов
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve reviews', error });
  }
};

// Получение одного отзыва по ID
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve review', error });
  }
};

// Обновление отзыва по ID
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.text = text;
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review', error });
  }
};

// Удаление отзыва по ID
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.destroy();
    res.status(204).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error });
  }
};