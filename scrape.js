const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const url = "https://minecraft-archive.fandom.com/wiki/Blocks/Gallery";

async function main() {
  const locations = await retrieveBlockLocations();
  for (let location of locations) {
    await uploadFileToS3(location.url, location.name);
  }
  const newLocations = locations.map((x) => ({
    name: x.name,
    url: `https://cdn.rifik.com/minecraft/images/${x.name}.png`,
  }));
  fs.writeFile(
    "src/app/images.ts",
    `export const images = ${JSON.stringify(newLocations, "test", 2)}`,
    (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("JSON file has been written successfully.");
      }
    }
  );
}

async function retrieveBlockLocations() {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const galleryItems = $(".wikia-gallery-item");

  const urls = [];

  galleryItems.each((index, element) => {
    const image = $(element).find(".thumbimage");
    const url = image.attr("data-src");
    const name = image.attr("alt");
    urls.push({ name, url });
  });
  return urls;
}

async function uploadFileToS3(url, name) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const fileData = response.data;

    const uploadParams = {
      Bucket: "rifik-backend-cdn",
      Key: `minecraft/images/${name}.png`,
      Body: fileData,
    };

    const command = new PutObjectCommand(uploadParams);

    const s3Client = new S3Client({
      region: "us-east-1",
      profile: "tp",
    });
    const result = await s3Client.send(command);

    console.log("File uploaded successfully!", result);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

main();
