let gradethreshold = [[4.0, 3.0, 2.0, 0], [4.0, 3.7, 3.3, 3, 2.7, 2.3, 2, 0]];
let gradecolorlist = ["var(--green)", "var(--yellow)", "var(--orange)", "var(--red)", "var(--crimson)", "var(--crimson)"];
let grademap = {"A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3, "B-": 2.7, "C+": 2.3, "C": 2, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0}

export function determineGradeColor(grade, format) {
  if ((grade !== -1) && (typeof(grade) === `number`)) {
    var Prefs = JSON.parse(localStorage.getItem("settings")) || [1,3,2];
    var n = Prefs[2] - 1;
    var delta = 4.01;
    var color;
    gradethreshold[n].forEach(boundary => {
      if (Math.abs(boundary - grade) <= delta) {
        delta = Math.abs(boundary - grade);
        try{
          color = gradecolorlist[gradethreshold[n].indexOf(boundary)]
        } catch {
          color = gradecolorlist[gradecolorlist.length - 1]
        }
      }
    });
    return color;
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

export function determineRatingColor(value, max = 5, highIsBetter = true) {
  const rating = (value / max) * 100;

	let color = "var(--green)";
	if (highIsBetter) {
		if (rating < 33) color = "var(--red)";
		else if (rating < 67) color = "var(--orange)";
	} else {
		if (rating >= 80) color = "var(--red)";
		else if (rating >= 60) color = "var(--orange)";
	}
	return color;
}
