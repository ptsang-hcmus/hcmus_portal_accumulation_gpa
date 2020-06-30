var notCount = [],
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
console.log("Tín chỉ tích lũy (có tính quốc phòng và thể dục):", accumulationCredit);
console.log("Tín chỉ tính điểm (ko tính quốc phòng, thể dục):", totalCredit);
console.log("GPA tích lũy:", totalScore / totalCredit);
console.log("GPA tích lũy khi tốt nghiệp:", round(totalScore / totalCredit));
