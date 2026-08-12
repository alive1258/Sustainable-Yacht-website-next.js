// src/utils/prescriptionPdf.ts
// PDF export for prescriptions — same html2canvas + jsPDF approach as
// orderPdf.ts, but captures an already-rendered DOM node (the on-screen
// PrescriptionDocument) instead of injecting an HTML string, so the print
// view, the downloaded PDF, and the shared file are always pixel-identical
// to one canonical template.

/**
 * Renders a live DOM element to a jsPDF document (possibly multi-page).
 */
async function renderElementToPdf(element: HTMLElement) {
  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF } = await import("jspdf");

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const imgData = canvas.toDataURL("image/png");

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  return pdf;
}

/**
 * Downloads the prescription as a PDF file.
 */
export async function downloadPrescriptionPDF(
  element: HTMLElement,
  filename: string,
) {
  const pdf = await renderElementToPdf(element);
  pdf.save(filename);
}

/**
 * Builds the prescription PDF as a File — used for the Web Share API so
 * WhatsApp/mobile share sheets can attach the actual document, not just a
 * link.
 */
export async function getPrescriptionPdfFile(
  element: HTMLElement,
  filename: string,
): Promise<File> {
  const pdf = await renderElementToPdf(element);
  const blob = pdf.output("blob") as Blob;
  return new File([blob], filename, { type: "application/pdf" });
}
