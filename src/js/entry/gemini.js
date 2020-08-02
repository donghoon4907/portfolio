import $ from "jquery";
import "bootstrap";
import CORE from "../core";
import fetchCore from "../fetch-core";

$(document).ready(() => {
  const { variables } = fetchCore(CORE);

  const $sectionEl = $(".portfolio-section");
});
