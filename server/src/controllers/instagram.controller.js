const instagramService = require('../services/instagram.service');

/**
 * Controller to handle requests for retrieving Instagram photos.
 */
const getInstagramPhotos = async (req, res, next) => {
  try {
    const result = await instagramService.fetchPhotos();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInstagramPhotos
};
