const $ = item => document.querySelector(item)
const apiUrl = 'https://api-free.deepl.com/v2/translate';

let authKey
let toggleInfo = false
let toggleSett = false

chrome.storage.local.get(["key"])
    .then((result) => {
        if (result.key == undefined) {
            $('#noApiSign').classList.remove('hidden')
        }
        $('#apikeyInput').placeholder = result.key
        authKey = result.key;
    })
    .catch((err) => { /* No manejo error porque no quiero */ });



const translate = (text, sourceLanguage, targetLanguage) => {

    const requestData = {
        text: [text],
        target_lang: targetLanguage,
        source_lang: sourceLanguage,
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
            const answer = data?.translations[0]
            $('.divider').classList.remove('transparent')
            $('#textarea_result').textContent = answer?.text
        })
        .catch((error, response) => {
            $('#apiError').classList.remove('transparent')
            console.error('Error en la solicitud:', error);
        });
}
const showSection = section => {
    $(`#${section}`).classList.remove('hidden')
    $(`#${section}`).classList.add('showHover')
}
const closeSection = section => {
    $(`#${section}`).classList.add('hidden')
    $(`#${section}`).classList.remove('showHover')
}
$('#btnInfo').addEventListener('click', () => {
    if (!toggleInfo) {
        toggleInfo = true
        showSection('info')
        closeSection('settings')
        toggleSett = false

        $('main').classList.add('hidden')
    } else if (toggleInfo) {
        toggleInfo = false
        closeSection('info')
        $('main').classList.remove('hidden')
    }
})
$('#btnSettings').addEventListener('click', () => {
    if (!toggleSett) {
        toggleSett = true
        showSection('settings')
        closeSection('info')
        toggleInfo = false

        $('main').classList.add('hidden')
    } else if (toggleSett) {
        toggleSett = false
        closeSection('settings')
        $('main').classList.remove('hidden')
    }
})
$('#btnTranslate').addEventListener('click', () => {
    translateText()
})
$('#btnSaveApiKey').addEventListener('click', () => {
    if ($('#apikeyInput').value !== '') {
        chrome.storage.local.set({ key: $('#apikeyInput').value }).then(() => {
            $('#apiAddedMssg').classList.remove('hidden')
            $('#noApiSign').classList.add('hidden')
            setTimeout(() => {
                $('#apiAddedMssg').classList.add('hidden')
            }, 5000)
            $('#apiError').classList.add('transparent')
            authKey = $('#apikeyInput').value
        });
    }
})
$('#textarea').addEventListener('keydown', event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        translateText();
    }
})
function translateText() {
    translate($('#textarea').value, $('#source_lang').value, $('#lang').value)
}

/*  LINKS  */

$('#btnNiiico').addEventListener('click', () => {
    chrome.tabs.create({
        url: 'https://niiico.com'
    })
})
$('#deepl').addEventListener('click', () => {
    chrome.tabs.create({
        url: 'https://www.deepl.com/login'
    })
})
$('#buyMeACoffe').addEventListener('click', () => {
    chrome.tabs.create({
        url: 'https://www.buymeacoffee.com/lunago28'
    })
})
$('#gotoOptions').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

