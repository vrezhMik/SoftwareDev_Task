$(document).ready(function () {
  async function getData() {
    const request = await fetch("../data.json");
    const dataResp = await request.json();
    Object.entries(dataResp).forEach((element, i) => {
      const elName = element[0];
      const elLength = element[1].length;
      const elArr = dataResp[elName];
      const dataObjcetPool = new ObjectPool(elLength);
      const colors = ["#099b72", "#e3ab44", "#33658A"];
      $(".product_row").append(
        "<div class='product'><div class='product_name'>" +
          elName +
          "</div><div class='box " +
          elName +
          "'></div></div>"
      );

      elArr.forEach((item, c) => {
        var itemId = elName + c;
        const element = $(
          '<div class="item" style="background:' +
            colors[i] +
            '" id="' +
            itemId +
            `" onclick="sendData(${itemId},'${elName}')">` +
            item +
            "</div>"
        );
        dataObjcetPool.append(element);
      });
      dataObjcetPool.poolItems.forEach((poolMember) => {
        $("." + elName).append(poolMember.data);
      });
      $("." + elName).on("scroll", function () {
        if (
          $(this).scrollTop() + $(this).innerHeight() >=
          $(this)[0].scrollHeight
        ) {
          const item = dataObjcetPool.findFreePoolMember();

          item.free = false;
          $(this).append(item.data);
        }
      });
    });
  }
  getData();
});

var result = {};
function sendData(elId, parent) {
  const arrId = $(elId).attr("id").replace(/[^\d]/g, "");
  const dictId = $(elId)
    .attr("id")
    .replace(/[^a-zA-Z]+/g, "");
  const itemValue = $(elId).text();
  if ($(`.${parent} div`).hasClass("selected")) {
    $(`.${parent} div`).removeClass("selected");
  }
  $(elId).addClass("selected");
  result[dictId] = btoa(arrId + itemValue);
}

function showData() {
  Object.entries(result).forEach((element) => {
    console.log(element[0] + ": " + element[1]);
    $(".box .item").removeClass("selected");
  });
}
