const { Router } = require("express");
const Image = require("../models").image;
const { toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");

const router = new Router();

// async function getImages() {
//   try {
//     const allImages = await Image.findAll();
//     // console.log("Images", allImages);
//     return allImages.map((image) => image.get({ plain: true }));
//   } catch (e) {
//     console.error(e);
//   }
// }

async function getImageByPk(id) {
  try {
    const image = await Image.findByPk(id);

    return image;
  } catch (e) {
    console.error(e);
  }
}

async function getImageByTitle(title) {
  try {
    console.log("title", title);
    const image = await Image.findOne({ where: { title: title } });

    return image;
  } catch (e) {
    console.error(e);
  }
}

router.get("/title/:title", async (req, res, next) => {
  const image = await getImageByTitle(req.params.title);
  res.send(image);
});

router.get("/:id", async (req, res, next) => {
  const image = await getImageByPk(req.params.id);
  res.send(image);
});

// router.get("/", async (req, res, next) => {
//   const allImages = await getImages();
//   res.send(allImages);
// });

router.get("/", async (req, res, next) => {
  try {
    const allImages = await Image.findAll();
    res.json(allImages);
  } catch (e) {
    next(e);
  }
});

// async function createImages(body) {
//   try {
//     const image1 = await Image.create({
//       title: "KungFu Panda",
//       url: `http://www.kungfupandamovie-ph.com/img/gallery/gallery0.jpg`,
//     });
//   } catch (e) {
//     console.error(e);
//   }

// }

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      res.status(400).send("missing parameters");
    } else {
      const newImage = await Image.create({
        title,
        url,
      });
      res.json(newImage);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/auth/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
    const allImages = await Image.findAll();
    res.json(allImages);
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

module.exports = router;
