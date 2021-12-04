const posts = require("../models/post");
const user = require("../models/user");
const verify = require("../middlewares/verifyuser");
const async = require("async");
const {client} = require("../redis/redis");

const mostLikedPost = async () => {
  try {
    const date = new Date();
    let monthNumber = date.getMonth();
    let yearNumber = date.getFullYear();
    let returnValue = {};
    let response = await posts.find({
      createdAt: {
        $gte: new Date(yearNumber, monthNumber - 1, 1),
        $lt: new Date(yearNumber, monthNumber, 1),
      },
    }).populate("user");
    if (response) {
      console.log(response);
      const mostLiked = {
        id: 0,
        likes: 0,
      };
      response.forEach((post) => {
        if (post.likes.length > mostLiked.likes) {
          mostLiked.id = {
            postId: post._id,
            imageUrl: post.imageUrl,
            caption: post.caption,
            likes: post.likes,
            user: post.user.username,
            createdAt: post.createdAt,
            profilePic: post.user.profilePic,
          };
          mostLiked.likes = post.likes.length;
        }
      });
      returnValue = {
        success: true,
        mostLiked,
      };
    }
    return returnValue;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

let mostSavedPost = async () => {
  try {
    const date = new Date();
    let monthNumber = date.getMonth();
    let yearNumber = date.getFullYear();
    let data = await user.find({}).populate("savedPosts");
    if (data) {
      const mostSaved = {
        id: 0,
        saves: 0,
      };
      let saved = {};
      data.forEach((user) => {
        user.savedPosts.forEach(async (post) => {
          if (
            post.createdAt.getMonth() + 1 === monthNumber &&
            post.createdAt.getFullYear() === yearNumber
          ) {
            saved[post.id] = {};
            saved[post.id] = {
                val:(saved[post.id].val || 0) + 1,
                post
            }
          }
        });
      });
    await Promise.all(Object.keys(saved).map(async (key) => {
          const user1 = await user.findById({
              _id:saved[key].post.user
            }).select({"username":1,"profilePic":1});
            console.log(user1);
            saved[key].username = user1.username;
            saved[key].profilePic = user1.profilePic;
      }));
      Object.keys(saved).forEach((key) => {
        if (saved[key].val > mostSaved.saves) {
          mostSaved.id = {
              ...saved[key].post._doc,
              username:saved[key].username,
              profilePic:saved[key].profilePic
          };
          mostSaved.saves = saved[key].val;
        }
      });
      return {
        success: true,
        mostSaved,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

const getStarOfTheMonth = async ({ res }, { req }) => {
  try {
    client.get("starofthemonth", async (err, reply) => {
        let month = new Date().getMonth()-1;
        if (reply && JSON.parse(reply).month === month) {
            console.log("redis");
            res.status(200).json({
                success: true,
                star: JSON.parse(reply).star,
            });
        } else {
            console.log("db");
            let mostLiked = await mostLikedPost();
            let mostSaved=await mostSavedPost();
            let star = {
                mostLiked: mostLiked,
                mostSaved: mostSaved
            };
            if(star.mostLiked.success && star.mostSaved.success){
                client.set("starofthemonth", JSON.stringify({
                    success: true,
                    star,
                    month
                }));
                return res.status(200).json({
                    success: true,
                    star,
                })
            }else{
                return res.status(200).json({
                    success: false,
                    message: "Error fetching data"
                })
            }
        }
    });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
  mostLikedPost,
  mostSavedPost,
  getStarOfTheMonth,
};
