export class ValidationForm {
    constructor(dataForm) {
        this.msgError = [];
        this.post = [];
        this.fields = []
        const reformattedArray = dataForm.map(({
            key,
            value
        }) => ({
            [key]: value
        }));
    }

    Clean(string) {
        let stringClean = string.replace(['/\s+/', '/^\s|\s$/'], [' ', '']);
        //stringClean = trim(stringClean);
        //stringClean = EscSlashes(stringClean);
        //stringClean = htmlspecialchars(stringClean);
        stringClean = stringClean.replace("<script>", "");
        stringClean = stringClean.replace("</script>", "");
        stringClean = stringClean.replace("<script src>", "");
        stringClean = stringClean.replace("</script type=>", "");
        stringClean = stringClean.replace("SELECT * FROM", "");
        stringClean = stringClean.replace("DELETE FROM", "");
        stringClean = stringClean.replace("INSERT INTO", "");
        stringClean = stringClean.replace("SELECT COUNT(*) FROM", "");
        stringClean = stringClean.replace("DROP TABLE", "");
        stringClean = stringClean.replace("DROP DATABASE", "");
        stringClean = stringClean.replace("OR '1'='1'", "");
        stringClean = stringClean.replace("OR 1=1", "");
        stringClean = stringClean.replace("OR 1 = 1", "");
        stringClean = stringClean.replace('OR "1"="1"', "");
        stringClean = stringClean.replace('OR ´1´=´1´', "");
        stringClean = stringClean.replace("is NULL; --", "");
        stringClean = stringClean.replace("IS NULL; --", "");
        stringClean = stringClean.replace("LIKE '", "");
        stringClean = stringClean.replace('LIKE "', "");
        stringClean = stringClean.replace("LIKE ´", "");
        stringClean = stringClean.replace("OR 'a'='a'", "");
        stringClean = stringClean.replace('OR "a"="a"', "");
        stringClean = stringClean.replace('OR ´a´=´a´', "");
        stringClean = stringClean.replace("OR ´a´=´a´", "");
        stringClean = stringClean.replace("--", "");
        stringClean = stringClean.replace("^", "");
        stringClean = stringClean.replace("[", "");
        stringClean = stringClean.replace("]", "");
        stringClean = stringClean.replace("==", "");
        return stringClean;
    }

    GetErrors() {
        // global $dictionary;
        // global $langFunct;
        let dictionary = this.LoadFileJson('../../Metadata/Dictionary.json')
        let counter = 0
        // Se genera un array con la informacion definida en diccionario:
        this.post.forEach((value) => {
            // Validación de campos obligatorios (vacíos).
            if (dictionary[this.fields[counter]].required && empty(value)) {
                this.msgError.push('************campo ' + this.fields[counter] + ' vacio************') //$langFunct['emptyField']($dictionary[$key]['desc']);
            }
            if (!empty(value)) {
                // Validación de longitud.
                if (!empty(dictionary[this.fields[counter]].length) && value.length > dictionary[this.fields[counter]].length) {
                    this.msgError.push('************excede*************') //$langFunct['exceedsLength']($dictionary[$key]['desc'], $dictionary[$key]['length']);
                }
                console.log('siii')
                // Validación de tipo de dato.
                this.Datatype(dictionary[this.fields[counter]].fieldType, dictionary[this.fields[counter]].length, value, dictionary[this.fields[counter]].desc);
            }
            // Validación de función declarada en el diccionario
            // if(!empty($dictionary[$key]['validationForm'])){
            // 	$this->msgError[] = $dictionary[$key]['validationForm'](
            // 		$this->post, 
            // 		$dictionary[$key]['fieldType'], 
            // 		$dictionary[$key]['length'], 
            // 		$dictionary[$key]['required'], 
            // 		$key, 
            // 		$dictionary[$key]['desc']
            // 	);
            // }
            counter++
        })
        let countErrors = 0
        this.msgError.forEach((key, value) => {
            if (!empty(value)) {
                countErrors++;
            }
        })
        return countErrors == 0 ? {
            'post': this.post
        } : {
            'error': this.msgError
        };
    }
    
    Datatype(fieldType, length, value, desc) {
        //global $langFunct;
        switch (fieldType) {
            case 'CHAR':
            case 'VARCHAR':
            case 'LONGTEXT':
                let RegexCharVarchar = '/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛäëïöüÄËÏÖÜñÑãõåÃÅÿýÕø¢~çacceACCEeiEIlnLNØUUYÝZZßÇOÆCSZ0-9#@.\-\/ ()_]{1,' + length + '}$/';
                if (!preg_match(RegexCharVarchar, value, matches)) {
                    this.msgError += 'error char' //$langFunct['errorDataType']($value, $desc, $fieldType);
                }
                break;
            case 'DATE':
                let RegexDate = '/^[0-9]{4}-[0|1][0-9]-[0-3][0-9]/';
                if (!preg_match(RegexDate, value)) {
                    this.msgError += 'error date' //$langFunct['errorDataType']($value, $desc, $fieldType);
                } else {
                    list(Anio, Mes, Dia) = preg_split('/\D+/', value);
                    let ValidacionFecha = checkdate(Mes, Dia, Anio);
                    if (!ValidacionFecha) {
                        this.msgError += 'error date 2' //$langFunct['wrongDate']($value, $desc);
                    }
                }
                break;
            case 'DATETIME':
                let RegexDatetime = '/^[0-9]{4}-[0|1][0-9]-[0-3][0-9] [0-2][0-9]:[0-5][0-9]:[0-5][0-9]/';
                if (!preg_match(RegexDatetime, value)) {
                    this.msgError += 'error datetime' //$langFunct['errorDataType']($value, $desc, $fieldType);
                } else {
                    list(Anio, Mes, Dia, Hora, Minutos, Segundos) = preg_split('/\D+/', value);
                    let ValidacionFecha = checkdate(Mes, Dia, Anio);
                    let ValidacionHora = (Hora < 0 || Hora > 23 || Minutos < 0 || Minutos > 59 || Segundos < 0 || Segundos > 59) ? false : true;
                    if (!ValidacionFecha || !ValidacionHora) {
                        this.msgError += 'error datetime 2' //$langFunct['wrongDate']($value, $desc);
                    }
                }
                break;
            case 'DECIMAL':
            case 'FLOAT':
            case 'NUMERIC':
                // if (strval((float)value) != value) 
                // {
                //     this.msgError += 'error numeric'//$langFunct['errorDataType']($value, $desc, $fieldType);
                // }
                break;
            case 'BIGINT':
            case 'TINYINT':
            case 'INTEGER':
            case 'SMALLINT':
                let RegexInt = '/^[-\+]?[0-9]{1,' + length + '}$/';
                if (!preg_match(RegexInt, value)) {
                    this.msgError += 'error smallint' //$langFunct['errorDataType']($value, $desc, $fieldType);
                }
                // if (strval((int)value) != value) 
                // {
                //     this.msgError += 'error smallint 2'//langFunct['errorDataType']($value, $desc, $fieldType);
                // }
                break;
            case 'BOOL':
                let RegexBool = '/^[0-1]{1}$/';
                if (!preg_match(RegexBool, value)) {
                    this.msgError += 'error bool' //$langFunct['errorDataType']($value, $desc, $fieldType);
                }
                break;
        }
    }
}