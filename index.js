const animals = [
  { name: "budi", species: "dog", class: { name: "mamalia" } },

  { name: "nemo", species: "fish", class: { name: "invertebrata" } },

  { name: "bayu", species: "dog", class: { name: "mamalia" } },

  { name: "jalin", species: "dog", class: { name: "mamalia" } },

  { name: "dory", species: "fish", class: { name: "invertebrata" } },
];

const Onlydog = animals.filter((data) => data.species === "dog");
console.log(Onlydog);

function Fish(item) {
  if (item.species === "fish") {
    item.class.name = "ovipar";
  }
}

animals.forEach(Fish);
const Onlyfish = animals.filter((data) => data.species === "fish");
console.log(Onlyfish);

$.ajax({
  url: "https://pokeapi.co/api/v2/pokemon/",
})
  .done((res) => {
    // console.log(res.results);
    let temp = "";
    $.each(res.results, function (key, val) {
      // literal template
      temp += `<tr>
                    <td>${key + 1}</td>
                    <td>${val.name}</td>
                    <td><button class="btn btn-primary" onclick="detailGambar('${
                      val.url
                    }')" data-bs-toggle="modal" data-bs-target="#modalDetailPoke">Detail</button></td>
                </tr>`;
    });
    // console.log(temp);
    $("#tablePoke").html(temp);
    console.log(res.results);
  })
  .fail((err) => {
    console.log(err);
  });

// function detailPoke(url) {
//   $.ajax({
//     url: url,
//   }).done((res) => {
//     $(".modal-title").html(res.name);
//     console.log(res.name);
//   });
// }

function detailGambar(url) {
  $.ajax({
    url: url,
  }).done((res) => {
    let temp = "";
    temp = `<img src="${res.sprites.other.dream_world.front_default}" alt="Girl in a jacket" width="200" height="300" style="margin-left:auto; margin-rigth:auto">`;
    let kemampuan = "";
    $.each(res.abilities, function (key, val) {
      kemampuan += `<button class="nav-link" id="v-pills-${val.ability.name}-tab" data-bs-toggle="pill" data-bs-target="#buka-detail" type="button" role="tab" aria-controls="v-pills-${val.ability.name}" aria-selected="false" onclick="detailAbility('${val.ability.url}')">${val.ability.name}</button>
     `;
    });
    let dataKemampuan = "";
    $.each(res.abilities, function (key, val) {
      dataKemampuan += `<div class="tab-pane fade" id="buka-detail" role="tabpanel" aria-labelledby="v-pills-${val.ability.name}-tab" tabindex="0"></div>
     `;
    });
    $("#v-pills-tabContent").html(dataKemampuan);
    $("#v-pills-tab").html(kemampuan);
    $("#gambar-detail").html(temp);
    $(".modal-title").html(res.name);
    console.log(kemampuan);
  });
}

function detailAbility(data) {
  $.ajax({
    url: data,
  }).done((res) => {
    let detailKemampuan = "";
    $.each(res.effect_entries, function (key, val) {
      detailKemampuan = `<p>${val.effect}</p>`;
    });
    $("#buka-detail").html(detailKemampuan);
    console.log(detailKemampuan);
  });
}
