const soap = require("soap")

const url = "https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL"

export default async function checkIdentity(firstName, lastName, birthYear, identityNo) {
   return new Promise((resolve, reject) => {
    if (!identityAlgoControl(identityNo)) {
        reject(false);
    }

    const person = {
        Ad: firstName.toLocaleUpperCase("tr-TR"),
        Soyad: lastName.toLocaleUpperCase("tr-TR"),
        DogumYili: birthYear.toString(),
        TCKimlikNo: identityNo
    }

    soap.createClient(url, function(err, client) {
        if (err) {
            reject(err)
        } else {
            client.TCKimlikNoDogrula(person, function(err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result.TCKimlikNoDogrulaResult)
            })
        }
        
    })

   })
}

function identityAlgoControl(identityNo) {
    let
      tek = 0,
      cift = 0,
      sonuc = 0,
      TCToplam = 0,
      hatali = [11111111110, 22222222220, 33333333330, 44444444440, 55555555550, 66666666660, 7777777770, 88888888880, 99999999990];;
    if (identityNo.length != 11) return false;
    if (isNaN(identityNo)) return false;
    if (identityNo[0] == 0) return false;

    tek = parseInt(identityNo[0]) + parseInt(identityNo[2]) + parseInt(identityNo[4]) + parseInt(identityNo[6]) + parseInt(identityNo[8]);
    cift = parseInt(identityNo[1]) + parseInt(identityNo[3]) + parseInt(identityNo[5]) + parseInt(identityNo[7]);

    tek = tek * 7;
    sonuc = Math.abs(tek - cift);
    if (sonuc % 10 != identityNo[9]) return false;

    for (let i = 0; i < 10; i++) {
      TCToplam += parseInt(identityNo[i]);
    }

    if (TCToplam % 10 != identityNo[10]) return false;

    if (hatali.toString().indexOf(identityNo) != -1) return false;

    return true;
  }