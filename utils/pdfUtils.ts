import { jsPDF } from 'jspdf';
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

  const selectedData = Object.values(groupedData).map((group) => group[0]);

  const data = selectedData.map((greenhouse) => [
    greenhouse.id,
    greenhouseNames[greenhouse.greenhouseId],
    greenhouse.value ? `${greenhouse.value} °C` : '0 °C',
    greenhouse.createdAt ? new Date(greenhouse.createdAt).toLocaleString('en-US') : '',
  ]);

  doc.autoTable({
    startY: 30,
    head: [['ID', 'Name', 'Value', 'Created at']],
    body: data,
  });

  // Guarda el PDF
  doc.save(`${reportTitle.toLowerCase().replace(/ /g, '-')}-report.pdf`);
};