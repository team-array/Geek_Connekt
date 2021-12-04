const verify = require("../middlewares/verifyuser").verifyuser;
const news = require("../models/news");

const addNews = ({ res }, { req }) => {
  try {
    verify(req.body.token)
      .then(async (user) => {
        const newNews = new news({
          title: req.body.title,
          description: req.body.description,
          postedBy: user.username,
        });
        await newNews.save((err, news) => {
          if (err) {
            res.status(200).json({
              success: false,
              message: "News already exists",
            });
          } else {
            res.status(200).json({
              success: true,
              message: "News Added Successfully",
              news: news,
            });
          }
        });
      })
      .catch((err) => {
        res.status(200).json({
          success: false,
          message: "Invalid Token",
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

const getNews = ({ res}, {req }) => {
  try {
    verify(req.body.token)
      .then(async (user) => {
        const page = parseInt(req.body.page);
        const limit = 25;
        const skip = page > 0 ? (page - 1) * limit : 0;
        const response = await news.find({})
                .sort({ $natural : -1 })
                .skip(skip)
                .limit(limit);
                
        if (!response) {
            return res.status(200).json({
            success: false,
            message: "Internal Server Error",
            error: err,
            });
        } else {
            return res.status(200).json({
            success: true,
            news: response,
            });
        }
      })
      .catch((err) => {
        res.status(200).json({
          success: false,
          message: "Invalid Token",
          error: err,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

const deleteNews = ({ res }, { req }) => {
  try {
    verify(req.body.token)
      .then(async (user) => {
        const response = await news.findOneAndDelete({
          _id: req.body.id,
          postedBy: user.username,
        });
        if (!response) {
          return res.status(200).json({
            success: false,
            message: "News not found",
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "News Deleted Successfully",
          });
        }
      })
      .catch((err) => {
        res.status(200).json({
          success: false,
          message: "You are not authorized to delete this news",
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};



module.exports = {
  addNews,
  getNews,
  deleteNews
};
