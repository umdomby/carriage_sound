

export const russian = (text, voice, language) => {

    if(language === 'ru-RU') {
        if (text.includes("голос включить")) {
            return 'голос включен'
        }
        if (text.includes("голос отключить") || text.includes("голос выключить")) {
            return 'голос выключен'
        }
        if (text.includes("мимика включить")) {
            return "мимика включена"
        }
        if (text.includes("мимика отключить") || text.includes("мимика выключить")) {
            return "мимика выключена"
        }
        if (text.includes("всё включить") || text.includes("включить всё")) {
            return "мимика и голос включены"
        }
        if (text.includes("всё выключить") || text.includes("выключить всё")) {
            return "мимика и голос выключены"
        }
    }
    if(voice === true) {
        if(language === 'ru-RU') {
            if (text.includes("вики") || text.includes("микки") || text.includes("витя")) {
                return "да, Сергей."
            }
            if (text.includes("перед") || text.includes("перёд")) {
                return "вперёд"
            }
            if (text.includes("назад")) {
                return "назад"
            }
            if (text.includes("лево") || text.includes("лева") || text.includes("лего") || text.includes("лёва")) {
                return "влево"
            }
            if (text.includes("права") || text.includes("право") || text.includes("справо") || text.includes("справа") || text.includes("трава")) {
                return "вправа"
            }
            if (text.includes("стоп") || text.includes("стоп")) {
                return "стоп"
            }
        }

        if(language === 'en-GB') {
            if (text.includes('go')) {
                return 'go'
            }
            if (text.includes('back')) {
                return 'back'
            }
            if (text.includes('left')) {
                return 'left'
            }
            if (text.includes('right')) {
                return 'right'
            }
            if (text.includes('stop')) {
                return 'stop'
            }
        }
    }

    return ''
}
