const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.static('public'));

app.get('/download', async (req, res) => {
    const url = req.query.URL;
    const format = req.query.format || 'mp3';

    try {
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[<>:"\/\\|?*]+/g, ''); // Filter karakter yang tidak valid pada nama file

        if (format === 'mp3') {
            res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
            ytdl(url, { format: 'mp3', filter: 'audioonly' }).pipe(res);
        } else if (format === 'mp4') {
            res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
            ytdl(url, { format: 'mp4' }).pipe(res);
        } else {
            res.status(400).send('Format yang diminta tidak valid.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengunduh konten.');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
