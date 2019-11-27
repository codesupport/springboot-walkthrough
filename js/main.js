function camelCaseToHyphen(str) {
  return str.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join("-");
}

let fileList = [];

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

document.querySelectorAll('.file').forEach(f => {
  let idName = camelCaseToHyphen(f.textContent);
  let code = document.querySelector("div[id='" + idName + "']");
  if (code != undefined) {
    fileList.push(code);
    f.addEventListener("click", e => {
      fileList.forEach(f => f.style.display = "none");
      code.style.display = "block";
    });
  }
});

{
  let dropdown = {
    tag: "div",
    props: [{
      name: "class",
      value: "btn-group"
    }],
    content: [{
        tag: "button",
        props: [{
            name: "class",
            value: "btn btn-secondary btn-sm dropdown-toggle"
          },
          {
            name: "type",
            value: "button"
          },
          {
            name: "data-toggle",
            value: "dropdown"
          },
          {
            name: "aria-haspopup",
            value: "true"
          },
          {
            name: "aria-expanded",
            value: "false"
          }
        ]
      },
      {
        tag: "div",
        props: [{
          name: "class",
          value: "dropdown-menu"
        }, {
          name: "id",
          value: "menu-links"
        }]
      }
    ]
  }

  let doc = {
    tag: "div",
    props: [{
      name: "class",
      value: "wrapper"
    }],
    content: [{
      tag: "div",
      props: [{
        name: "class",
        value: "wrapper-padding"
      }],
      content: [{
          tag: "div",
          props: [{
            name: "class",
            value: "header"
          }],
          content: [{
              tag: "div",
              props: [{
                name: "class",
                value: "logo"
              }],
              content: [{
                tag: "img",
                props: [{
                    name: "class",
                    value: "spring-logo"
                  },
                  {
                    name: "src",
                    value: "images/spring-boot-logo.png"
                  }
                ],
              }]
            },
            {
              tag: "div",
              props: [{
                name: "class",
                value: "menu"
              }],
              content: [dropdown]
            }
          ]
        },
        {
          tag: "div",
          props: [{
            name: "class",
            value: "content"
          }]
        }
      ]
    }]
  }

  function buildElement(elmnt) {
    let element = document.createElement(elmnt.tag);
    elmnt.props.forEach(p => {
      element.setAttribute(p.name, p.value);
    });
    if (elmnt.content != undefined) {
      elmnt.content.forEach(e => {
        element.append(buildElement(e))
      });
    }
    return element;
  }

  function fileNameToTitle(s) {
    let title = s.split("-").map(s => s.capitalize()).join(" ").trim();
    if (["", "Index", "Index.html"].includes(title)) {
      title = "SpringBoot Introduction";
    }
    return title;
  }

  function populateMenu() {
    let links = ["index", "basic-controller", "consumable-controller", "crud-repository"];
    let fileName = window.location.pathname.split("/").pop();
    document.querySelector(".menu").firstElementChild.firstElementChild.textContent = fileNameToTitle(fileName);
    let menu = document.querySelector("#menu-links");
    links.forEach(l => {
      let link = document.createElement("a");
      link.href = l + ".html";
      link.className = "dropdown-item";
      link.text = fileNameToTitle(l);
      menu.append(link);
    });
  }

  let docNodes = buildElement(doc);
  let intro = document.querySelector(".intro");
  intro.remove();
  docNodes.querySelector(".content").append(intro);
  let explorer = document.querySelector(".explorer");
  explorer.remove();
  docNodes.querySelector(".content").append(explorer);
  document.querySelector("body").append(docNodes);
  populateMenu();
}

$(document).ready(function() {
  $('[data-toggle="popover"]').popover();
});

hljs.initHighlightingOnLoad();
