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
  <select id="trait-bar">
    <option selected disabled>+/+ bar</option>
    <option value="pp">Cinnamon</option>
    <option>Choice 2</option>
    <option>Choice 3</option>
  </select>
</div>

<img id="gene-display" style="display:block; margin-top:20px; max-width:400px;">

<script>
  const traitMenu = document.getElementById('trait-bar');
  const displayImg = document.getElementById('gene-display');

  traitMenu.onchange = () => {
    displayImg.src = traitMenu.value === "pp" ? "cinnamon_gene_list.jpg" : "";
    displayImg.alt = traitMenu.value === "pp" ? "Cinnamon Gene Info" : "";
  };
</script>

</body>
</html>