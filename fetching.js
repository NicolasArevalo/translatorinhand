const authKey = '[BTTvNsU4JLGGn4wJ2]'; // Reemplaza con tu clave de autenticación
const apiUrl = 'https://api-free.deepl.com/v2/translate';

export const translate = (text, targetLanguage) => {

    const requestData = {
        text: [text],
        target_lang: targetLanguage,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `DeepL-Auth-Key ${authKey}`,
        },
        body: JSON.stringify(requestData),
    })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta de DeepL aquí
            console.log(data);
        })
        .catch(error => {
            // Manejar errores aquí
            console.error('Error en la solicitud:', error);
        });
}
