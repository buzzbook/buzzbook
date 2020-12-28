let gradethreshold = [[3.5, 2.5, 1.5], [3.75, 3.5, 3.25, 3, 2.75]];
let gradecolorlist = ["var(--green)", "var(--yellow)", "var(--orange)", "var(--red)", "var(--crimson)", "var(--crimson)"];
let grademap = {"A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3, "B-": 2.7, "C+": 2.3, "C": 2, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0}

export function determineGradeColor(grade) {
  if ((grade !== -1) && (typeof(grade) === `number`)) {
    var Prefs = JSON.parse(localStorage.getItem("settings")) || [1,3,2];
    var n = Prefs[2] - 1;
    var delta = gradethreshold[n][0] - gradethreshold[n][1];
    for (var i = 0; i < gradethreshold[n].length; ++i){
      if (0 < grade - gradethreshold[n][i] && grade - gradethreshold[n][i] <= delta) {
        return gradecolorlist[i];
      }
    }
    return gradecolorlist[gradethreshold[n].length];
  }
  return "var(--secondarytextcolor)";
}

export function determineGradeLetter(grade){
  var delta = 4.01;
  for (let letter in grademap) {
    if (Math.abs(grademap[letter] - grade) <= delta) {
      delta = Math.abs(grademap[letter] - grade);
      var lettergrade = letter;
    }
  }
  return lettergrade;
}
