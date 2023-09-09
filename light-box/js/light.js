/*
  Plugin : Light Box
  Version:0.0.0
  Author : Jawad
  Language : JavaScript

*/

/**
 *
 * @param {*} targetClassName
 * Class Name That Should Be Targeted e.g 'popup'
 * @param {*} mainImage Image That Should Be Default Image e.g example.jpg. If
 * Not Provided Then Automatically Picks The Default Image
 *
 */
const init = (targetClassName = "popup", mainImage = "") => {
  window.addEventListener("DOMContentLoaded", function () {
    if (!targetClassName && !mainImage) {
      console.error("Please Specify The TargetClassName And Default Image");
      return;
    }
    // get all the childs with the targetClassName i.e : class='popup'
    const childs = document.querySelectorAll(`.${targetClassName}`)
      ? document.querySelectorAll(`.${targetClassName}`)
      : [];
    const html = `<div id="pop-container">
      <span id="mv-left">&LeftAngleBracket;</span>
      <img id="mainImage" src=${
        mainImage ? mainImage : childs[0].src
      } alt="image" />
      <span id="mv-right">&RightAngleBracket;</span>
      <span id="close_">&Cross;</span>
    </div>`;

    const div = document.createElement("div");
    div.innerHTML = html;
    // append to body of document
    document.body.insertBefore(div, document.body.firstChild);
    // get the pop-up-container
    const popUpContainer = document.getElementById("pop-container");
    const leftControl = document.getElementById("mv-left");
    const rightControl = document.getElementById("mv-right");
    const closePopUpContainer = document.getElementById("close_");
    let currentIndex;

    console.log(childs);
    // make the each item clickable
    if (childs.length > 0) {
      for (let i = 0; i < childs.length; i++) {
        childs[i].addEventListener("click", function () {
          // show the light box
          popUpContainer.style.display = "flex";
          popUpContainer.querySelector("#mainImage").src = this.src;
          currentIndex = i;
        });
      }

      // control left
      leftControl.addEventListener("click", () => {
        if (currentIndex === 0) {
          currentIndex = 0;
        } else {
          currentIndex--;
        }
        popUpContainer.querySelector("#mainImage").src =
          childs[currentIndex].src;
      });
      // control right
      rightControl.addEventListener("click", () => {
        if (currentIndex === childs.length - 1) {
          currentIndex = childs.length - 1;
        } else {
          currentIndex++;
        }
        popUpContainer.querySelector("#mainImage").src =
          childs[currentIndex].src;
      });

      // close the popup
      closePopUpContainer.addEventListener("click", () => {
        popUpContainer.style.display = "none";
      });
    }
  });
};
