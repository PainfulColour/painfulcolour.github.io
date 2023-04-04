let variables = {};

let functions = {};

variables.modal = {};
functions.modal = {};

functions.waitforjquery = function (method) {
  if (window.jQuery) {
    method();
  } else {
    setTimeout(function () {
      functions.waitforjquery(method);
    }, 50);
  }
};

functions.modal.prompt = function (
  Title,
  Description = "",
  ButtonLayout = "close"
) {
  functions.waitforjquery(function () {
    let buttons = "";
    let modalID = (((1 + Math.random()) * 0x10000) | 0)
      .toString(16)
      .substring(1);
    switch (ButtonLayout) {
      case "close":
        buttons = `<button onclick='document.getElementById("${modalID}").remove()'>Close</button>`;
        break;

      default:
        buttons = `<button onclick='document.getElementById("${modalID}").remove()'>Close</button>`;
        break;
    }

    if (!buttons == "") {
      buttons = "<hr>" + buttons;
    }
    $("content").before(`
        <modal-container id='${modalID}'>
        <modal>
        <h1>${Title}</h1>
        <p>${Description}</p>
        ${buttons}
        </modal>
        </modal-container>`);
    setTimeout(function () {
      $(`#${modalID}`).addClass("vignette");
    }, 10);
  });
};
