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

router.get("/", async (req, res, next) => {
  const allImages = await getImages();
  res.send(allImages);
});

async function createImages() {
  try {
    const image1 = await Image.create({
      title: "KungFu Panda",
      url: `http://www.kungfupandamovie-ph.com/img/gallery/gallery0.jpg`,
    });
  } catch (e) {
    console.error(e);
  }
}

router.post("/", async (req, res, next) => {
  createImages();
  res.send("Success");
});

module.exports = router;
