require("babel-register")({
  presets: ["es2015", "react"]
});
 
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

const AWSAmplify = require("aws-amplify");
const Amplify = AWSAmplify.default;
const API = AWSAmplify.API;
const config = require("../config").default;

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "posts",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

async function generateSitemap() {
  try {
    const products = await API.get("products", "/products");
    let idMap = [];

    for(var i = 0; i < products.length; i++) {
      idMap.push({ id: products[i].productid });
    }

    const paramsConfig = {
      "/products/:id": idMap
    };

    return (
      new Sitemap(router)
          .applyParams(paramsConfig)
          .build("https://www.kwaysi.com")
          .save("./public/sitemap.xml")
    );
  } catch(e) {
    console.log(e);
  } 
}

generateSitemap();