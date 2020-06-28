# Tính điểm trung bình trên trang Portal của trường HCMUS qua console

*Vì Portal trường ko có tính năng này (sinh viên be like: wtf trường 🤣)*

### Lưu ý:
- Kết quả dùng để tham khảo thôi
- Nếu cần chính xác tuyệt đối ---> **lên phòng đào tạo cho chắc**

### Cách xài:
- Đăng nhập portal
- Chọn **Quản lý học tập** ---> **Tra cứu kết quả học tập**
- Chỗ **Năm Học** chọn **--Tất cả--** và nhấn **Xem Kết Quả Học Tập**
- Nhấn **F12**, chọn thẻ **Console**, copy tất cả script bên dưới và dán vào trong **Console** và nhấn **Enter**
- Kết quả nằm bên dưới bao gồm số **tín chỉ tích lũy**, số điểm **trung bình tích lũy**
- **Nếu** bạn có môn đã học cải thiện dưới tên khác (cũng là môn ban đầu nhưng khác tên một chút)
---> copy **tên môn học cải thiện cũ** vào trong danh sách `notCount`
    - Ví dụ: bạn học cải thiện môn với tên cũ **CTT306 - Máy học** ---> tên mới **CSC14005 - Nhập môn máy học** <br> thì `let notCount = ["CTT306 - Máy học"],`
    ```javascript
    let notCount = [],
        notMatterInGPA = [
            "QPH010 - Giáo dục quốc phòng",
            "TCH001 - Thể dục 1",
            "TCH002 - Thể dục 2",
        ],
        list = document.getElementById("tbDiemThiGK").getElementsByTagName("tbody")[0]
            .childNodes,
        courses = [...list]
            .map((e) => e.innerText)
            .map(
                (e) => (
                    (info = e.split("\t")),
                    {
                        No: info[0],
                        CourseName: info[1],
                        Credit: parseInt(info[2]),
                        Grade: parseFloat(info[5]),
                    }
                )
            )
            .filter((e) => e.Grade >= 5 && !notCount.includes(e.CourseName))
            .sort(
                (e, t) =>
                    e.CourseName > t.CourseName ||
                    (e.CourseName == t.CourseName && e.Grade > t.Grade)
            ),
        totalScore = 0,
        totalCredit = 0,
        accumulationCredit = 0;
    for (let i = 0; i < courses.length; i++) {
        if (i > 0 && courses[i - 1].CourseName == courses[i].CourseName) continue;
        accumulationCredit += courses[i].Credit;
        if (notMatterInGPA.includes(courses[i].CourseName)) continue;
        totalCredit += courses[i].Credit;
        totalScore += courses[i].Credit * courses[i].Grade;
    }
    function round(e, t = 2) {
        const o = Math.pow(10, t);
        return Math.round(e * o) / o;
    }
    console.log("Tín chỉ tích lũy:", accumulationCredit);
    console.log("Tín chỉ tính điểm (0 gồm quốc phòng, thể dục):", totalCredit);
    console.log("GPA tích lũy:", totalScore / totalCredit);
    console.log("GPA tích lũy khi tốt nghiệp:", round(totalScore / totalCredit));
    ```
