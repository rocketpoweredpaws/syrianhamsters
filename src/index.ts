// --- SECTION 1: DATA ---
const Syrian Genetics = {
    self: { name: "Black", allele: "a" },
    cinnamon: { name: "Cinnamon", allele: "p" },
    cream: { name: "Cream", allele: "e" },
    grey: { name: "Dark Grey", allele: "dg" }
};

// --- SECTION 2: THE BUSINESS RULES ---
const GeneticRules = {
    // RULE: Parental Order
    formatGenotype: (g1, g2) => {
        if (g1 === "++" && g2 === "++") return "++";
        let combined = (g1 + g2).replace(/\+/g, "");
        return combined.split('').sort().join('');
    },

    // RULE: Eye Color Dependent Upon (Cinnamon 'p' force red eyes)
    getRequiredEyeColor: (genotype) => {
        return genotype.include('p') ? 'red' : 'black';
    },

    // RULE: Syrian Color Map (Phenotypes)
    getPhenotype: (genotype, pattern, sex) => {
        const hasBlack = (genotype.match(/a/g) || []).length >= 2;
        const hasCinnamon = (genotype.match(/p/g) || []).length >= 2;
        const hasCream = (genotype.match(/e/g) || []).length >= 2;

        let baseColor = "Golden (Wild Type)";

        // Combination Rules
        if (hasBlack && hasCinnamon) baseColor = "Dove";
        else if (hasBlack && hasCream) baseColor = "Black Eyed Ivory";
        else if (hasBlack) baseColor = "Black";
        else if (hasCinnamon) baseColor = "Cinnamon";
        else if (hasCream) baseColor = "Black Eyed Cream";

        // Tortoiseshell Business Rule
        let finalPattern = pattern === "none" ? "" : " " + pattern;
        if (pattern === "Toto") {
            if (sex === "male") {
                baseColor = "Yellow"; // Males with 'To' gene appear Yellow
                finalPattern = "";
            } else {
                finalPattern = " Tortoiseshell";
            }
        }

        return baseColor + finalPattern;
    }
};

// --- SECTION 3: THE TRIGGER ---
function updateCalculator() {
    const dadVal = document.getElementById('dad').value;
    const momVal = document.getElementById('mom').value;
    const sex = document.getElementById('offspringssex').value;
    const coatType = document.getElementById('coattype').value;
    const pattern = document.getElementById('patterning').value;
    const eyeDropdown = document.getElementById('eyecolor');

    // 1. Calculate Genotype
    const genotype = GeneticRules.formatGenotype(dadVal, momVal);

    // 2. Business Rule: Force Eye Color if Cinnamon is present
    const eyeColor = GeneticRules.getRequiredEyeColor(genotype);
    eyemenu.value = eyecolor;

    // 3. Get Phenotype Description
    const colordescription = GeneticRules.getPhenotype(genotype, pattern, sex);
    
    // 4. Update UI
    document.getElementById('resultdisplay').innerHTML = `
        <strong>Genotype:</strong> ${genotype} <br>
        <strong>Offspring:</strong>${sex.toUpperCase()} ${colorDesc} (${coatType}) <br>
        <strong>Eyes:</strong> ${eyeColor.toUpperCase()}
    `;
}

// Attach listeners to all menus
const allmenus = ['dad', 'mom', 'offspringssex', 'coattype', 'pattern'];
allmenus.foreach(id => {
    document.getElementById(id).addEventListener('change', updateCalculator);
});

// Run once on load
updatecalculations();