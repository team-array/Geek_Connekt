const xlsx = require("xlsx");

exports.uploadAttendance = (req, res) => {
    console.log("uploadAttendance");
    console.log(req.body);
    console.log(req.files);
    let file = req.files.file;
    var workbook = xlsx.readFile(file.tempFilePath);
    var sheet_name_list = workbook.SheetNames;
    var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
    // const workBook = xlsx.readFile(file.tempFilePath);
    // const worksheet = workBook.Sheets[workBook.SheetNames[0]];
    // console.log(workBook);
    // let posts = [];
    // let post = {};

    // for (let cell in worksheet) {
    //     const cellAsString = cell.toString();

    //     const row = cellAsString.match(/\d+/g);
    // }

    // console.log(posts);
};
