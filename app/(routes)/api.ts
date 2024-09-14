export const fetchDataForDate = async (date: Date) => {
    // Implementa la lógica para obtener los datos de la fecha seleccionada
    // Esto puede ser una llamada a una API o cualquier otra fuente de datos
    const response = await fetch(`/api/data?date=${date.toISOString()}`);
    const data = await response.json();
    return data;
};