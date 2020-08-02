import $ from "jquery";
import "bootstrap";
import CORE from "../core";
import fetchCore from "../fetch-core";

$(document).ready(() => {
  const { variables } = fetchCore(CORE);

  const $sectionEl = $(".portfolio-section");
  const $footerEl = $(".portfolio-footer");
  const $timelineEl = $(".portfolio-timeline");
  const $dotEl = $(".portfolio-timeline__dot");

  $sectionEl.height(variables.VIEWPORT_HEIGHT).css("opacity", 1);

  $(window).on("scroll", () => {
    const { scrollY } = window;
    const index = Math.floor(scrollY / variables.VIEWPORT_HEIGHT);

    $dotEl.removeClass("active");
    $timelineEl.find(`[data-index=${index}]`).addClass("active");

    if (scrollY < 300) {
      $footerEl.css("opacity", 1);
    } else {
      $footerEl.css("opacity", 0);
    }
  });

  $dotEl.on("click", ({ target }) => {
    const { index } = target.dataset;
    const scrollTop = variables.VIEWPORT_HEIGHT * index;

    $dotEl.removeClass("active");
    $(target).addClass("active");

    $("html, body")
      .stop()
      .animate({
        scrollTop
      });
  });
});
