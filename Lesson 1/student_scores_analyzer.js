// Student Scores Analyzer

const scores = [85, 72, 91, 64, 78];

console.log("Student Scores:");
scores.forEach(score => console.log(score));
console.log();

function getRemark(score) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 75) return "Good";
  return "Failed";
}

let total = 0;
let passedCount = 0;
let failedCount = 0;
let highest = scores[0];
let lowest = scores[0];

scores.forEach((score, index) => {
  const remark = getRemark(score);
  const status = remark === "Failed" ? "Failed" : "Passed";

  if (status === "Passed") {
    console.log(`Student ${index + 1}: ${score} - ${remark} - ${status}`);
    passedCount++;
  } else {
    console.log(`Student ${index + 1}: ${score} - ${status}`);
    failedCount++;
  }

  total += score;
  if (score > highest) highest = score;
  if (score < lowest) lowest = score;
});

const average = total / scores.length;

console.log();
console.log(`Total Score: ${total}`);
console.log(`Average Score: ${average}`);
console.log(`Highest Score: ${highest}`);
console.log(`Lowest Score: ${lowest}`);
console.log(`Passed: ${passedCount}`);
console.log(`Failed: ${failedCount}`);
