// --- SECTION 1: DATA ---
const SYRIAN_GENES = {
    self: { name: "Black", allele: "a" },
    cinnamon: { name: "Cinnamon", allele: "p" },
    cream: { name: "Cream", allele: "e" },
    grey: { name: "Dark Grey", allele: "dg" }
};

// --- SECTION 2: THE BUSINESS RULES ---
const GeneticRules = {
    // RULE: Parent Order & Combination
    formatGenotype: (g1, g2) => {
        if (g1 === "++" && g2 === "++") return "++";
        let combined = (g1 + g2).replace(/\+/g, "");
        return combined.split('').sort().join('');
    },

    // RULE: Eye Color Dependency (Cinnamon 'p' forces red eyes)
    getRequiredEyeColor: (genotype) => {
        return genotype.includes('p') ? 'red' : 'black';
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
    const sex = document.getElementById('offspring-sex').value;
    const coatType = document.getElementById('coat-type').value;
    const pattern = document.getElementById('pattern').value;
    const eyeDropdown = document.getElementById('eye-color');

    // 1. Calculate Genotype
    const genotype = GeneticRules.formatGenotype(dadVal, momVal);

    // 2. Business Rule: Force Eye Color if Cinnamon is present
    const eyeColor = GeneticRules.getRequiredEyeColor(genotype);
    eyeDropdown.value = eyeColor;

    // 3. Get Phenotype Description
    const colorDesc = GeneticRules.getPhenotype(genotype, pattern, sex);
    
    // 4. Update UI
    document.getElementById('result-display').innerHTML = `
        <strong>Genotype:</strong> ${genotype} <br>
        <strong>Offspring:</strong> ${sex.toUpperCase()} ${colorDesc} (${coatType}) <br>
        <strong>Eyes:</strong> ${eyeColor.toUpperCase()}
    `;
}

// Attach Listeners to all menus
const allMenus = ['dad', 'mom', 'offspring-sex', 'coat-type', 'pattern'];
allMenus.forEach(id => {
    document.getElementById(id).addEventListener('change', updateCalculator);
});

// Run once on load
updateCalculator();