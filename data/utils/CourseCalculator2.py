class CourseCalculator2:
	def profScore(scores):
		weights = [.5,.1,.1,.05,.05,.05,.05,.1]
		exponents = [2.5,2,1,1,3,2,1,1]
		for i in range(len(scores)):
			if scores[i] is None:
				weights[i] = 0
				scores[i] = 0
		totalScore = 0
		for i in range(len(scores)):
			totalScore+= ((.2*scores[i])**exponents[i])*weights[i]
		normalizedScore = round(totalScore/sum(weights)*100,3)
		return(normalizedScore)
	def courseScore(scores):
		weights = [.5,.2,.2,.1]
		exponents = [2.5,2,1,1]
		for i in range(len(scores)):
			if scores[i] is None:
				weights[i] = 0
				scores[i] = 0
		totalScore = 0
		for i in range(len(scores)-1):
			totalScore+= ((.2*scores[i])**exponents[i])*weights[i]
		totalScore+=scores[3]/100*weights[3]
		normalizedScore = round(totalScore/sum(weights)*100,3)
		return(normalizedScore)