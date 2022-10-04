import express from 'express';

export const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get("/json", (req, res) => {
    const message = req.query.msg || "Hello World!";
    res.json({ message });
});