import axios from "axios"; // Asegúrate de que axios esté disponible en tu función

export const handler = async (event) => {
  const { stat } = event.queryStringParameters; // Obtener el puerto del query string

  if (!stat) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Stat parameter is required." }),
    };
  }

  const url = `http://partyviberadio.com:${stat}/stats?sid=1`;

  try {
    const response = await axios.get(url);
    console.log(response);
    return {
      statusCode: response.status,
      body: response.data, // Esto debe ser la respuesta de la API
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({
        message: "Error fetching data.",
        error: error.message,
      }),
    };
  }
};
