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


function pAequorFactory(specimenNum, dna) {

  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate: function() {
      let randomIndex = Math.floor(Math.random() * 15);
      let randomDNA = dna[randomIndex];
      const dnaBases = ['A', 'T', 'C', 'G'];
      let dnaOfThree = dnaBases.filter(dna => dna != randomDNA);
      let randomDNAofThree = dnaOfThree[Math.floor(Math.random() * 3)]
      dna[randomIndex] = randomDNAofThree;
      return dna;
    },
    compareDNA: function(pAequor) {
      let commanDNA = [];
      for(let i = 0; i < dna.length; i++) {
        if(dna[i] == pAequor.dna[i]) {
          commanDNA.push(dna[i]);
        } 
      } 
      let sum = commanDNA.length;
      let percentage = (sum / 15) * 100;
      let roundPercentage = percentage.toFixed(2);
      return `${specimenNum} and ${pAequor.specimenNum} have ${roundPercentage}% DNA in commom.`;
    },
    willLikelySurvive: function() {
      let c = dna.filter(dna => dna == "C");
      let g = dna.filter(dna => dna == "G");
      let percentageOfC = c.length / 15;
      let percentageOfG = g.length / 15;
      let percentageSum = percentageOfC + percentageOfG;
      return(percentageSum >= 0.6 ? true : false);
    }
  }
};

let filteredArr = [];
let counter = 1;

while(filteredArr.length < 30) {
    let newpAequor = pAequorFactory(counter, mockUpStrand());
    if(newpAequor.willLikelySurvive()) {
        filteredArr.push(newpAequor);
    }
    counter++;
}
