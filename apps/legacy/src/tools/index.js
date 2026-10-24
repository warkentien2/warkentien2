function growCompletelyFrom(currentVal, completeVal, startVal) {
  return Math.min(completeVal, ((completeVal * Math.max(0, currentVal - startVal)) / (completeVal - startVal)))
}

export default {
  growCompletelyFrom
}
