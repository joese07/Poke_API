// const animals = [
//   { name: "budi", species: "dog", class: { name: "mamalia" } },

//   { name: "nemo", species: "fish", class: { name: "invertebrata" } },

//   { name: "bayu", species: "dog", class: { name: "mamalia" } },

//   { name: "jalin", species: "dog", class: { name: "mamalia" } },

//   { name: "dory", species: "fish", class: { name: "invertebrata" } },
// ];

// const Onlydog = animals.filter((data) => data.species === "dog");
// console.log(Onlydog);

// function Fish(item) {
//   if (item.species === "fish") {
//     item.class.name = "ovipar";
//   }
// }

// animals.forEach(Fish);
// const Onlyfish = animals.filter((data) => data.species === "fish");
// console.log(Onlyfish);

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
    temp = `<img src="${res.sprites.other.dream_world.front_default}" alt="Girl in a jacket" width="200" height="300">`;
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
    let dataId = "";
    dataId = res.id;

    let dataBase = "";
    dataBase = res.base_experience;

    let dataHeight = "";
    dataHeight = res.height;

    let dataWeight = "";
    dataWeight = res.weight;

    let dataIsdefault = "";
    dataIsdefault = res.is_default;

    let dataOrder = "";
    dataOrder = res.order;

    let dataTypes = "";
    $.each(res.types, function (key, val) {
      dataTypes += `
      <tr>
      <td>${val.slot}</td>
      <td>${val.type.name}</td>
      </tr>
    `;
    });

    let dataStats = "";
    $.each(res.stats, function (key, val) {
      dataStats += `<tr>
      <td>${val.base_stat}</td>
      <td>${val.effort}</td>
      <td>${val.stat.name}</td> </tr>`;
    });

    let dataMoves = "";
    $.each(res.moves, function (key, val) {
      dataMoves += `<tr>
      <td>${key + 1}</td>
      <td>${val.move.name}</td>
      /tr>`;
    });

    let dataSpecies = "";
    dataSpecies = `<tr><td>${res.species.name}</td><td>${res.species.url}</td></tr>`;

    let dataForms = "";
    $.each(res.forms, function (key, val) {
      dataForms += `<tr><td>${key + 1}</td><td>${val.name}</td><td>${
        val.url
      }</td></tr>`;
    });

    let dataGame = "";
    $.each(res.game_indices, function (key, val) {
      dataGame += `<tr>
      <td>${key + 1}</td>
      <td>${val.game_index}</td>
      <td>${val.version.name}</td>
      <td>${val.version.url}</td>
      </tr>`;
    });

    let config = null;
    const myChart = document.getElementById("myChart");

    let dataStatsLabel = res.stats.map((data) => data.stat.name);

    let dataStatsBase = res.stats.map((data) => data.base_stat);
    const data = {
      labels: dataStatsLabel,
      datasets: [
        {
          label: "Stats",
          data: dataStatsBase,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    };

    if (Chart.getChart("myChart")) {
      Chart.getChart("myChart").destroy();
    }

    config = new Chart(myChart, {
      type: "radar",
      data: data,
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    });

    // config = new Chart(myChart, {
    //   type: "radar",
    //   data: data,
    //   options: {
    //     elements: {
    //       line: {
    //         borderWidth: 3,
    //       },
    //     },
    //   },
    // });

    $("#data-games").html(dataGame);
    $("#data-forms").html(dataForms);
    $("#data-species").html(dataSpecies);
    $("#data-movess").html(dataMoves);
    $("#data-status").html(dataStats);
    $("#data-types").html(dataTypes);
    $("#order-pokemon").html(dataOrder);
    $("#isdefault-pokemon").html(dataIsdefault);
    $("#weight-pokemon").html(dataWeight);
    $("#height-pokemon").html(dataHeight);
    $("#base-experience-pokemon").html(dataBase);
    $("#id-pokemon").html(dataId);
    $("#v-pills-tabContent").html(dataKemampuan);
    $("#v-pills-tab").html(kemampuan);
    $("#gambar-detail").html(temp);
    $(".modal-title").html(res.name);
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
