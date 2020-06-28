/**
 * Lưu ý:
 * - Nếu bạn cần điểm chính xác     => Xin điểm từ trường cho chắc, cẩn thận 6.99 7.99 khi tốt nghiệp
 * - Nếu bạn chỉ cần ước tính điểm  => Đây là cái bạn cần .. hoặc excel
 *
 * Cách xài:
 * - Đăng nhập portal
 * - Chọn "Tra Cứu Kết Quả Học Tập"
 * - Chỗ năm học chọn "--Tất cả--" và nhấn "Xem kết quả học tập"
 * - Nhấn F12, chọn thẻ "console", copy tất cả script và dán vào trong console và nhấn Enter
 *
 * Trường hợp học cải thiện
 * - Nếu 2 tên môn học giống nhau: không cần làm gì, điểm nào cao lấy
 * - Nếu 2 tên môn học khác nhau:
 *      VD: Học cải thiện môn với tên cũ
 *          "CTT306 - Máy học" --> tên mới "CSC14005 - Nhập môn máy học"
 *          thì: let notCount = ["CTT306 - Máy học"]
 */

let notCount = [];

let scores = document
    .getElementById("tbDiemThiGK")
    .getElementsByTagName("tbody")[0].childNodes;
scores = [...scores];

// Mấy môn này có tính tín chỉ nhưng không tính điểm vào GPA
let notMatterInGPA = [
    "QPH010 - Giáo dục quốc phòng",
    "TCH001 - Thể dục 1",
    "TCH002 - Thể dục 2",
];

let final = scores
    .map((item) => item.innerText)
    .map((item) => {
        info = item.split("\t");
        return {
            No: info[0],
            Course: info[1],
            Credit: parseInt(info[2]),
            Grade: parseFloat(info[5]),
        };
    })
    .filter((item) => {
        return item.Grade >= 5 && !notCount.includes(item.Course);
    });

final.sort(
    (a, b) => a.Course > b.Course || (a.Course == b.Course && a.Grade > b.Grade)
);

let totalScore = 0,
    totalCredit = 0,
    accumulationCredit = 0;
for (let i = 0; i < final.length; i++) {
    if (i > 0 && final[i - 1].Course == final[i].Course) continue;

    accumulationCredit += final[i].Credit;
    if (notMatterInGPA.includes(final[i].Course)) continue;

    // Bỏ comment dòng tiếp theo nếu bạn muốn xem danh sách các môn được tính
    // console.log(final[i]);
    totalCredit += final[i].Credit;
    totalScore += final[i].Credit * final[i].Grade;
}

console.log("Tín chỉ tích lũy:", accumulationCredit);
console.log(
    "Tín chỉ tính điểm (không bao gồm quốc phòng, thể dục):",
    totalCredit
);
console.log("Điểm trung bình tích lũy:", totalScore / totalCredit);
console.log(
    "Điểm trung bình tích lũy khi tốt nghiệp:",
    Math.round((totalScore / totalCredit) * 100) / 100
);