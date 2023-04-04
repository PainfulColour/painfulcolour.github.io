let functions = {};

functions.general = {};
functions.modal = {};

functions.general.waitforjquery = function (method) {
  if (window.jQuery) {
    method();
  } else {
    setTimeout(function () {
      functions.waitforjquery(method);
    }, 50);
  }
};

functions.general.randomstring = function (length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

functions.modal.close = function (modalID) {
  $(`#${modalID}`).removeClass("vignette");
  $(`content`).css("filter", "");

  $(`#${modalID} > modal`).fadeOut(400);
  setTimeout(() => {
    $(`#${modalID}`).remove();
  }, 1200);
};

functions.modal.prompt = function (
  Title,
  Description = "",
  ButtonLayout = "close"
) {
  functions.general.waitforjquery(function () {
    let buttons = "";
    let modalID = functions.general.randomstring(12);
    switch (ButtonLayout) {
      case "close":
        buttons = `<button onclick='functions.modal.close("${modalID}");'>Close</button>`;
        break;

      default:
        buttons = `<button onclick='functions.modal.close("${modalID}");'>Close</button>`;
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
    $(`#${modalID}`).fadeOut(0);
    $(`#${modalID}`).fadeIn(400);
    $(`#${modalID}`).addClass("vignette");
    $(`content`).css("filter", "blur(var(--modal-backdrop-blur))");
  });
};
