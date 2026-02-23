<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body {
    background: #f4f4f4;
    font-family: Arial, sans-serif;
    padding: 30px;
  }
  .dropdown {
    margin-bottom: 15px;
  }
  select {
    width: 300px;
    padding: 12px 16px;
    border-radius: 25px;
    border: none;
    background: #e0e0e0;
    font-size: 16px;
    appearance: none;
    outline: none;
    cursor: pointer;
  }
</style>
</head>

<body>

<div class="dropdown">
  <select>
    <option selected disabled>+/+ non rec.red</option>
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </select>
</div>

<div class="dropdown">
  <select>
    <option selected disabled>+/+ blue</option>
    <option>Option A</option>
    <option>Option B</option>
    <option>Option C</option>
  </select>
</div>

<div class="dropdown">
  <select>
    <option selected disabled>+/+ bar</option>
    <option>Choice 1</option>
    <option>Choice 2</option>
    <option>Choice 3</option>
  </select>
</div>

<script>
  const traitspics = document.createElement('img');
  traitspics.id = "gene-display";
  traitspics.style.display = "block";
  traitspics.style.marginTop = "20px";
  traitspics.style.maxWidth = "400px"; 
  document.body.appendChild(traitspics);

  const dropdowns = document.querySelectorAll('select');
  const traitmenu = dropdowns[2];

  for (let option of traitmenu.options) {
    if (option.text === "Choice 1") {
      option.text = "Cinnamon";
      option.value = "pp"; 
    }
  }

  traitmenu.addEventListener('change', function() {
    if (this.value === "pp") {
      traitspics.src = "cinnamon_gene_list.jpg"; 
      traitspics.alt = "Cinnamon Gene Info";
      console.log("Linked: Cinnamon (pp) image triggered.");
    } else {
      traitspics.src = "";
    }
  });
</script>

</body>
</html>