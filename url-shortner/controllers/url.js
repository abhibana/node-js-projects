import shortid from "shortid";
import { URL } from "../models/url.js";

export async function handleGenerateNewShortURL(req, res) {

    if (!req.body.url) {
        return res.status(400).json({ error: 'URL is requried' });
    }

    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: req.body.url,
        visitedHistory: [],
        createdBy: req.user._id
    });


    return res.render('home', { id : shortId });
}

export async function handleShortURLRedirection(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
       {
        $push: {
            visitHistory : {
                timestamp: Date.now()
            }
        }
       }
    );

    res.redirect(entry.redirectUrl);
}

export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId });

    return res.json({totalClicks : result.visitHistory.length, analytics: result.visitHistory });
}