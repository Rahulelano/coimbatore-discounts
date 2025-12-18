import Image from '../models/Image.js';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Convert buffer to Base64
        const encoded = req.file.buffer.toString('base64');

        const newImage = new Image({
            name: req.file.originalname,
            data: encoded,
            contentType: req.file.mimetype
        });

        const savedImage = await newImage.save();

        // Return the URL to access this image
        // Assuming backend runs on port 5000 - In prod this should be dynamic
        const PORT = process.env.PORT || 5001;
        const imageUrl = `http://localhost:${PORT}/api/image/${savedImage._id}`;

        res.json({
            message: 'Image uploaded successfully',
            id: savedImage._id,
            url: imageUrl
        });
    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

export const getImageById = async (req, res) => {
    try {
        const img = await Image.findById(req.params.id);
        if (!img) return res.status(404).json({ error: 'Image not found' });

        const imgBuffer = Buffer.from(img.data, 'base64');

        res.writeHead(200, {
            'Content-Type': img.contentType,
            'Content-Length': imgBuffer.length
        });
        res.end(imgBuffer);
    } catch (err) {
        console.error('Retrieval Error:', err);
        res.status(500).json({ error: 'Error retrieving image' });
    }
};

export const getImages = async (req, res) => {
    try {
        // Find all images but exclude the heavy 'data' field to keep payload light
        const images = await Image.find({}, { name: 1, contentType: 1, uploadDate: 1 });
        const PORT = process.env.PORT || 5001;

        const imageList = images.map(img => ({
            id: img._id,
            name: img.name,
            url: `http://localhost:${PORT}/api/image/${img._id}`,
            uploadDate: img.uploadDate
        }));

        res.json(imageList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch images' });
    }
};
