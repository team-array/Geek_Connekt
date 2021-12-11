const notes = require("../models/notes");
const nanoid = require("nanoid").nanoid;
const verify = require("../middlewares/verifyuser").verifyuser;
const fs = require("fs");
const { PDFNet } = require("@pdftron/pdfnet-node");
const { cloudinary } = require("../utils/cloudinary");
const pdf = require("pdf-thumbnail");

const uploadNotes = async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.files.file.mimetype);
        if (req.files.file.mimetype !== "application/pdf") {
            return res
                .status(200)
                .send("cannot upload file only pdfs are allowed !");
        }
        verify(req.body.token)
            .then(async (user) => {
                if (user.role == "Student" || user.role == "student") {
                    return res
                        .status(200)
                        .send("You are not authorized to upload notes !");
                }
                const filename = nanoid();
                req.files.file.mv(
                    `${__dirname}/../notes/${filename}.pdf`,
                    async (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(200).json({
                                success: false,
                                message: "failed to upload file",
                            });
                        }
                        const docPdfUploaded = fs.readFileSync(
                            `${__dirname}/../notes/${filename}.pdf`
                        );
                        // console.log(docPdfUploaded);
                        const data = await pdf(docPdfUploaded);
                        try {
                            console.log(data);
                            let thumbnailStream = data.pipe(
                                fs.createWriteStream(`./${filename}.jpg`)
                            );
                            thumbnailStream.on("finish", async () => {
                                try {
                                    // console.log("done");
                                    // console.log(`./${filename}.jpg`);
                                    const uploadCloudinary =
                                        await cloudinary.uploader.upload(
                                            `./${filename}.jpg`,
                                            {
                                                upload_preset: "khq1jtjg",
                                            }
                                        );
                                    // console.log(uploadCloudinary);
                                    fs.unlinkSync(`./${filename}.jpg`);
                                    const newNote = await notes({
                                        subject: req.body.subject,
                                        description: req.body.description,
                                        file: filename,
                                        postedBy: user.username,
                                        topicName: req.body.topicName,
                                        thumbNail: uploadCloudinary.secure_url,
                                    });
                                    newNote.save((err, newNote) => {
                                        if (err) {
                                            console.log(err);
                                            fs.unlink(
                                                `${__dirname}/../notes/${filename}.pdf`
                                            );
                                            return res.status(200).json({
                                                success: false,
                                                message: "failed to save note",
                                            });
                                        }
                                        return res.status(200).json({
                                            success: true,
                                            message:
                                                "note uploaded successfully",
                                            newNote,
                                        });
                                    });
                                } catch (err) {
                                    console.log(err);
                                }
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    }
                );
            })
            .catch((err) => {
                console.log(err);
                return res.status(200).json({
                    success: false,
                    message: "Invalid token",
                });
            });
    } catch (err) {
        console.log(err);
    }
};

const downloadNotes = async (req, res) => {
    try {
        verify(req.body.token)
            .then(async (user) => {
                const fileName = req.body.fileName;
                const file = `${__dirname}/../notes/${fileName}.pdf`;
                return res.download(file);
            })
            .catch((err) => {
                console.log(err);
                return res.status(200).json({
                    success: false,
                    message: "Invalid token",
                });
            });
    } catch (error) {
        res.status(400).send("error occured while dowloading file !!");
    }
};

const deleteNotes = async (req, res) => {
    try {
        verify(req.body.token)
            .then(async (user) => {
                const fileName = req.body.fileName;
                const file = `${__dirname}/../notes/${fileName}.pdf`;
                fs.unlink(file, (err) => {
                    if (err) throw err;
                    console.log("path/file was deleted");
                });

                const newNote = await notes.findOneAndDelete({
                    file: fileName,
                    postedBy: user.username,
                });
                if (!newNote) {
                    return res.status(200).json({
                        success: false,
                        message: "note not found",
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "note deleted successfully",
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(200).json({
                    success: false,
                    message: "Invalid token",
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getNotes = (req, res) => {
    try {
        verify(req.body.token)
            .then(async (user) => {
                const page = req.body.page;
                const limit = req.body.limit;
                const skip = (page - 1) * limit;
                const queryNotes = await notes
                    .find({})
                    .skip(skip)
                    .limit(limit)
                    .sort({ $natural: -1 });
                if (queryNotes) {
                    return res.status(200).json({
                        success: true,
                        message: "notes fetched successfully",
                        notes: queryNotes,
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "failed to fetch notes",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(200).json({
                    success: false,
                    message: "Invalid token",
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "error occured while getting notes",
        });
    }
};

const searchNotes = (req, res) => {
    try {
        verify(req.body.token)
            .then(async (user) => {
                // const page = req.body.page;
                // const limit = req.body.limit;
                // const skip = (page - 1) * limit;
                const search = req.body.search;
                const queryNotes = await notes
                    .find({
                        $or: [
                            { subject: { $regex: search, $options: "i" } },
                            { postedBy: { $regex: search, $options: "i" } },
                            { topicName: { $regex: search, $options: "i" } },
                        ],
                    })
                    .sort({ $natural: -1 });
                //   .skip(skip)
                //   .limit(limit);
                if (queryNotes) {
                    return res.status(200).json({
                        success: true,
                        message: "notes fetched successfully",
                        notes: queryNotes,
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "failed to fetch notes",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(200).json({
                    success: false,
                    message: "Invalid token",
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "error occured while searching notes",
        });
    }
};

const getAllNotes = (req, res) => {
    try {
        verify(req.body.token)
            .then(async (user) => {
                const queryNotes = await notes.find({}).sort({ $natural: -1 });
                if (queryNotes) {
                    return res.status(200).json({
                        success: true,
                        message: "notes fetched successfully",
                        notes: queryNotes,
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "failed to fetch notes",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(200).json({
                    success: false,
                    message: "Invalid token",
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "error occured while getting notes",
        });
    }
};

module.exports = {
    uploadNotes,
    downloadNotes,
    deleteNotes,
    getNotes,
    searchNotes,
    getAllNotes,
};
