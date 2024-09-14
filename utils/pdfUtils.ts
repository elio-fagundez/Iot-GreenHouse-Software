import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Greenhouse {
  id: number;
  greenhouseId: string;
  value?: number;
  createdAt?: string;
}

export const handleDownloadPDF = (
  days: number,
  filteredItems: Greenhouse[],
  greenhouseNames: { [key: string]: string },
  reportTitle: string
) => {
  const doc = new jsPDF();

  // Asegúrate de que reportTitle sea una cadena de texto
  if (typeof reportTitle !== 'string') {
    console.error('Invalid reportTitle:', reportTitle);
    return;
  }

  doc.text(reportTitle, 14, 20);
  console.log("Days:", days);

  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() - days);

  const filteredData = filteredItems.filter((greenhouse) => {
    const createdAt = new Date(greenhouse?.createdAt || '');
    return createdAt >= limitDate;
  });

  const groupedData = filteredData.reduce((acc, greenhouse) => {
    const date = new Date(greenhouse.createdAt || '').toLocaleDateString('en-US');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(greenhouse);
    return acc;
  }, {} as { [key: string]: Greenhouse[] });

  let startY = 30;

  Object.keys(groupedData).forEach((date) => {
    const data = groupedData[date].map((greenhouse) => [
      greenhouse.id,
      greenhouseNames[greenhouse.greenhouseId],
      greenhouse.value ? `${greenhouse.value} °C` : '0 °C',
      greenhouse.createdAt ? new Date(greenhouse.createdAt).toLocaleString('en-US') : '',
    ]);

    doc.text(`Date: ${date}`, 14, startY);
    startY += 10;

    doc.autoTable({
      startY: startY,
      head: [['ID', 'Name', 'Value', 'Created at']],
      body: data,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: 'linebreak',
        halign: 'center',
        valign: 'middle',
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    startY = doc.lastAutoTable.finalY + 10; // Ajusta la posición para la siguiente tabla
  });

  // Guarda el PDF
  doc.save(`${reportTitle.toLowerCase().replace(/ /g, '-')}-report.pdf`);
};