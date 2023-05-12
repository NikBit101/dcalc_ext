export default function getPrediction(level5Grades) {
  const level6Mods = [
    { name: "mod1", marks: 0 },
    { name: "mod2", marks: 0 },
    { name: "mod3", marks: 0 },
    { name: "mod4", marks: 0 },
  ];

  const level5GradesCount = [ 
    { name: "between70", count: 0 },
    { name: "between60", count: 0 },
    { name: "between50", count: 0 },
    { name: "between40", count: 0 },
  ];
  
  // If we count how many grades are between certain bands, then we can average grades in the bands and get more accurate values for predicting
  // Function to count how many grades from level5Grades are between certain bands.
  // Calculate averages of grades in specific boundaries.
  // Add a percentage increase to each of the averages depending on which band they are in.


  const marks = level5Grades;
  const passedMarks = [];

  for(const module of marks) {
    // skip the mark if it's empty or below 40
    if (module.marks === null || module.marks < 40) { continue; }

    passedMarks.push(module.marks);
  }
  const predictedGrades = [];

  passedMarks.forEach((grade, i) => {
    if (grade >= 60) {
      level6Mods[i].marks = Math.round(grade * 1.15);
    } else if (grade >= 50 && grade < 60) {
      level6Mods[i].marks = Math.round(grade * 1.10);
    } else if (grade >= 40 && grade < 50) {
      level6Mods[i].marks = Math.round(grade * 1.05);
    } else {
      level6Mods[i].marks = Math.round(grade);
    }
    predictedGrades.push(level6Mods[i]);
  });
  console.log(predictedGrades);
}