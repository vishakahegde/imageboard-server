const { Router } = require("express");
const Image = require("../models").image;

const router = new Router();

async function getImages() {
  try {
    const allImages = await Image.findAll();
    // console.log("Images", allImages);
    return allImages.map((image) => image.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}

async function getImageByPk(id) {
  try {
    const image = await Image.findByPk(id);
    console.log("Image:", image);
    return image;
  } catch (e) {
    console.error(e);
  }
}

async function getImageByTitle(title) {
  try {
    console.log("title", title);
    const image = await Image.findOne({ where: { title: title } });
    console.log("Image:", image);
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

router.get("/", async (req, res, next) => {
  const allImages = await getImages();
  res.send(allImages);
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

module.exports = router;
