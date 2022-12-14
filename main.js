// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Create a factory function which returns an object. The object should accept two parameters: a unique number and a random strand of dna.
// The object should return the given number and dna 
// a method to mutate a random dna base in the strand
// a method to compare its dna with other given dna strand
// a method to tell wether the new pAequor is likely to survive 
const pAequorFactory = (specimenNum, dna) => {

  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      } 
      dna[randomIndex] = newBase;
      return dna;
    },
    compareDNA(pAequor) {
      const commonDNA = dna.reduce((acc, curr, idx, arr) => {
        if (acc[idx] === pAequor.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const percentOfDNAshared = (commonDNA / 15) * 100;
      const roundUpPercentage = percentOfDNAshared.toFixed(2);
      return `${specimenNum} and ${pAequor.specimenNum} have ${roundUpPercentage}% DNA in commom.`;
    },
    willLikelySurvive() {
      const cOrG = dna.filter(el => el === "C" || el === "G");
      return(cOrG.length / 15 >= 0.6);
    },
  }
};

// Create 30 random strand of DNA which are likely to survive
const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newStrand);
  } idCounter++;
} 