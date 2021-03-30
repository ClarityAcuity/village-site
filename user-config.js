require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  title: `Village`,
  description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
  author: `@gatsbyjs`,
  username: `ClarityAcuity`,
  url: process.env.GATSBY_SITE_URL || '',
  image: "images/bird.jpeg", // Path to your image you placed in the 'static' folder
  twitter: "VillagerLiao",
  facebook: "chunmin.liao.777",
  instagram: "villager1988",
  linkedin: "chun-min-liao-93680817",
  keywords: ["javascript", "gatsby", "react", "blog", "github"],
}
