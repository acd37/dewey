import BookService from '../services/bookService';

exports.test = async function (req, res, next) {
  try {
    const response = await BookService.test();
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
};

exports.getAll = async function (req, res, next) {
  try {
    const response = await BookService.getAll();
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
};
