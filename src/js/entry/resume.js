import $ from "jquery";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

$(document).ready(() => {
  const $pdfEl = $(".resume-header__pdf");
  const $sectionEl = $(".resume-section");

  $pdfEl.on("click", () => {
    html2canvas($sectionEl.get(0), {
      allowTaint: true,
      useCORS: true,
      logging: false,
      scale: 2
    }).then(canvas => {
      const doc = new jsPDF("p", "mm", "a4"); //jspdf객체 생성
      const imgData = canvas.toDataURL("image/png"); //캔버스를 이미지로 변환

      const imgWidth = 210; // 이미지 가로길이 (mm) A4 기준
      const pageHeight = 295; // 출력 페이지 세로 길이 A4 기준
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // 첫 페이지 출력
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 여러 페이지인 경우 이어 출력
      while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      //pdf저장
      doc.save("resume_이동훈.pdf");
    });
  });
});
