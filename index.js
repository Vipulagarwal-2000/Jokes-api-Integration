import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const base = "https://v2.jokeapi.dev/joke/";



app.get("/", async (req, res) => {
  try {
    const response = await axios.get(base + "Any");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      joke: result.joke,
      data: result.setup,
      delivery: result.delivery,
      multijokes: result.jokes,
      tag: result.category,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    // res.render("index.ejs", {
    //  error: error.message,});
  }
});

app.post("/specific", async (req, res) => {
  let cat = "";
  let flags = "";
  console.log(req.body);
  let type = "";
  let lang = req.body.language;
  let amount = Number(req.body.amount);

  for (
    var i = 0;
    i < (Array.isArray(req.body.categories) ? req.body.categories.length : 1);
    i++
  ) {
    if (!Array.isArray(req.body.categories)) {
      cat = req.body.categories;
      break;
    }
    cat += req.body.categories[i];
    if (i < req.body.categories.length - 1) {
      cat += ",";
    }
  }
  for (
    var i = 0;
    i < (Array.isArray(req.body.blacklist) ? req.body.blacklist.length : 1);
    i++
  ) {
    if (!Array.isArray(req.body.blacklist)) {
      flags = req.body.blacklist;
      break;
    }
    flags += req.body.blacklist[i];
    if (i < req.body.blacklist.length - 1) {
      flags += ",";
    }
  }
  if (typeof req.body.type !== Array) {
    type = req.body.type;
    if (type === undefined) {
      type = "";
    }
  }
  if (amount > 10 || amount < 1) {
    amount = 1;
  }

  try {
    const response = await axios.get(
      base +
        (cat === undefined ? "Any" : cat) +
        `?lang=` +
        lang +
        `&blacklistFlags=` +
        (flags === undefined ? "" : flags) +
        "&type=" +
        (typeof req.body.type !== Array ? type : "") +
        `&amount=` +
        (amount === undefined ? 1 : amount)
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      joke: result.joke,
      data: result.setup,
      delivery: result.delivery,
      multijokes: result.jokes,
      tag: result.category,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    // res.render("index.ejs", {
    //  error: error.message,});
  }
});

const base1 = "https://hindi-quotes.vercel.app/random/";

app.get("/Quotes", async (req, res) => {
  try {
    const response = await axios.get(base1);
    const result = response.data;
    console.log(result);
    res.render("Quotes.ejs", {
     quotes: result.quote,tag :result.type,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    // res.render("index.ejs", {
    //  error: error.message,});
  }
});

app.post("/custom", async (req, res) => {
  let cat = req.body.categories;
  if (cat === undefined) {
    cat="";
  }
  


  
  try {
    const response = await axios.get(
      base1 +
        cat
       
    );
    const result = response.data;
    console.log(result);
    res.render("Quotes.ejs", {
      quotes: result.quote, tag :result.type,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    // res.render("index.ejs", {
    //  error: error.message,});
  }
});

var base2 = "https://animechan.xyz/api/random";
app.get("/Anime", async (req, res) => {
  try {
    const response = await axios.get(base2);
    const result = response.data;
    console.log(result);
    res.render("Animechan.ejs", {
     
      anime: result.anime, 
      character: result.character,
      quote: result.quote

    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    // res.render("index.ejs", {
    //  error: error.message,});
  }
});

var base3 = "https://programming-quotesapi.vercel.app/api/random";
app.get("/program", async (req, res) => {
  try {
    const response = await axios.get(base3);
    const result = response.data;
    console.log(result);
    res.render("programming.ejs", {
     
      author: result.author,
      quote: result.quote,

    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    // res.render("index.ejs", {
    //  error: error.message,});
  }
});





app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


