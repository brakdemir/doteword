secilenKelime1 = "";
dogru = 0;
yanlıs = 0;
bos = 0;

let numbers = 0;

var bos_audio = new Audio('sounds/bos.mp3');
var correct_audio = new Audio('sounds/correct.mp3');
var fail_audio = new Audio('sounds/fail.mp3');

const letters=["a","b","c","ç","d","e","f","g","h","ı","i","j","k","l","m","n","o","ö","p","r","s","ş","t","u","ü","v","y","z"];
let secilenkelimeler = [];
let secilenanlamlar = [];

function setwords() {
  const fetchPromises = letters.map(letter => {
    const dosyaUrl = `https://raw.githubusercontent.com/burakddemir/Turkish_Words/main/word/${letter}.txt`;
    return fetch(dosyaUrl)
      .then(response => response.text())
      .then(icerik => {
        let kelimeSayisi = 0;

        if (icerik.length > 0) {
          kelimeSayisi = icerik.trim().split(/\s+/).length;
        }

        const randomSayi = Math.floor(Math.random() * kelimeSayisi) + 1;

        const kelimeler = icerik.trim().split(/\s+/);
        const secilenKelime = kelimeler[randomSayi - 1];
        secilenkelimeler.push(secilenKelime);

        const kelimeIndex = secilenkelimeler.length - 1;
        return fetch(`https://sozluk.gov.tr/gts?ara=${secilenKelime.toLowerCase()}`)
          .then(response => response.json())
          .then(data => {
            const anlamlarListe = data[0].anlamlarListe;
            if (anlamlarListe && anlamlarListe.length > 0) {
              const anlamText = anlamlarListe[0].anlam;
              secilenanlamlar[kelimeIndex] = anlamText;
            } else {
              console.log('Anlam bulunamadı.');
            }
          })
          .catch(error => {
            console.error('Bir hata oluştu:', error);
          });
      })
      .catch(error => {
        console.error('Bir hata oluştu:', error);
      });
  });

  Promise.all(fetchPromises)
    .then(() => {
      null
    });
}
window.onload = function() {
  setwords();
  setTimeout(rules, 500);
};

function sny(){
  document.getElementById("alert3").style.display = "block"; // Mesajı görünür yapar

  setTimeout(function() {
    document.getElementById("alert3").style.display = "none"; // Mesajı gizler
  }, 1700); 
}

function rules(){
  document.getElementById("startb").onclick = basla;

}

function basla(){
  const resim = document.getElementById("image");
  resim.src = "images/"+letters[numbers]+".png"

  const anlam = document.getElementById('anlam-text');
  anlam.innerHTML = secilenanlamlar[numbers];
  numbers++;


  document.getElementById("cevap").style.display = "block";
  document.getElementById("geçbutton").style.display = "block";
  document.getElementById("giris").style.display = "none";
  document.getElementById("alan").style.display = "block";
}


function change_img() {
  const cevap = document.getElementById("cevap").value.trim();
  const resim = document.getElementById("image");
  const again_b = document.getElementById("again");
  const tamam_div = document.getElementById("tamam-div");
  const anlam = document.getElementById("anlam-text");
  const dogruSayısı = document.getElementById("dogruSayısı");
  const yanlısSayısı = document.getElementById("yanlısSayısı");
  const bosSayısı = document.getElementById("bosSayısı");
  const sonuc = document.getElementById("sonuc");
  const alan = document.getElementById("alan");


    if (numbers == 28) {
      dogruSayısı.innerHTML += dogru;
      yanlısSayısı.innerHTML += yanlıs;
      bosSayısı.innerHTML += bos;
      ortalama = dogru - yanlıs;

      secilenanlamlar = [];
      secilenkelimeler = [];
      setwords();

      if (ortalama > 0){
        document.getElementById("ortalama").style.color = "green";
        document.getElementById("ortalama").innerHTML = ortalama;
      }
      else if (ortalama === 0){
        document.getElementById("ortalama").style.color = "black";
        document.getElementById("ortalama").innerHTML = ortalama;
      }
      else{
        document.getElementById("ortalama").style.color = "red";
        document.getElementById("ortalama").innerHTML = ortalama;
      }
      dogruSayısı.style.display = "block";
      yanlısSayısı.style.display = "block";
      bosSayısı.style.display = "block";
      again_b.style.display = "block";
      tamam_div.style.display = "none";
      resim.style.display = "none";
      anlam.style.display = "none";
      sonuc.style.display = "block"
      alan.style.display = "none";

      numbers = 0;
    }
    anlam.innerHTML = secilenanlamlar[numbers];
    resim.src = "images/"+letters[numbers]+".png";
    numbers++;
}


  function alert1() {
    document.getElementById("alert1").style.display = "block"; // Mesajı görünür yapar

    setTimeout(function() {
      document.getElementById("alert1").style.display = "none"; // Mesajı gizler
    }, 1700); 
  };

  function alert2() {
    document.getElementById("alert2").style.display = "block"; // Mesajı görünür yapar

    setTimeout(function() {
      document.getElementById("alert2").style.display = "none"; // Mesajı gizler
    }, 1700); 
  };

function check_answer(){
  
  const cevap = document.getElementById("cevap").value.trim();;
  const resim = document.getElementById("image");
  const again_b = document.getElementById("again");
  const tamam_div = document.getElementById("tamam-div");
  const anlam = document.getElementById("anlam-text");
  const dogruSayısı = document.getElementById("dogruSayısı");
  const yanlısSayısı = document.getElementById("yanlısSayısı");
  const bosSayısı = document.getElementById("bosSayısı");
  const sonuc = document.getElementById("sonuc");
  const alan = document.getElementById("alan");



  if(cevap.toLowerCase() === "bitir"){

    boslar = 29 - numbers + bos;
    dogruSayısı.innerHTML += dogru;
    yanlısSayısı.innerHTML += yanlıs;
    bosSayısı.innerHTML += boslar;
    ortalama = dogru - yanlıs;

    secilenanlamlar = [];
    secilenkelimeler = [];
    setwords();

    if (ortalama > 0){
      document.getElementById("ortalama").style.color = "green";
      document.getElementById("ortalama").innerHTML = ortalama;
    }
    else if (ortalama === 0){
      document.getElementById("ortalama").style.color = "black";
      document.getElementById("ortalama").innerHTML = ortalama;
    }
    else{
      document.getElementById("ortalama").style.color = "red";
      document.getElementById("ortalama").innerHTML = ortalama;
    }    
    dogruSayısı.style.display = "block";
    yanlısSayısı.style.display = "block";
    bosSayısı.style.display = "block";
    again_b.style.display = "block";
    tamam_div.style.display = "none";
    resim.style.display = "none";
    anlam.style.display = "none";
    sonuc.style.display = "block"
    alan.style.display = "none";
  }
  else if (!cevap) {
    alert1();
  }
  else if(cevap.substring(0,1).toLowerCase() != letters[numbers -1 ]){
    alert2();
  }

  else if (cevap.toLocaleLowerCase('tr') === secilenkelimeler[numbers - 1].toLocaleLowerCase('tr')) {
    correct_audio.pause();
    correct_audio.currentTime = 0; // Ses dosyasını baştan başlat
    correct_audio.play(); // Ses dosyasını başlat
    isPlaying = true; // Ses dosyasının çalındığını işaretleyin
        
    dogru += 1;
    cevap.onkeydown = change_img();
  } else {
    fail_audio.pause();
    fail_audio.currentTime = 0; // Ses dosyasını baştan başlat
    fail_audio.play(); // Ses dosyasını başlat
    isPlaying = true; // Ses dosyasının çalındığını işaretleyin
        
    yanlıs += 1;
    cevap.onkeydown = change_img();
  }
    document.getElementById("cevap").value = "";
  }



var canCallFunction = true;
function skip(){
if (canCallFunction){
  bos += 1;
  bos_audio.play();
  const resim = document.getElementById("image");
  const again_b = document.getElementById("again")
  const tamam_div = document.getElementById("tamam-div")
  const anlam = document.getElementById("anlam-text")
  const dogruSayısı = document.getElementById("dogruSayısı")
  const yanlısSayısı = document.getElementById("yanlısSayısı")
  const bosSayısı = document.getElementById("bosSayısı")
  const sonuc = document.getElementById("sonuc")
  const alan = document.getElementById("alan")



    if (numbers == 28) {
      dogruSayısı.innerHTML += dogru;
      yanlısSayısı.innerHTML += yanlıs;
      bosSayısı.innerHTML += bos;
      ortalama = dogru - yanlıs;
      secilenanlamlar = [];
      secilenkelimeler = [];
      setwords();
      if (ortalama > 0){
        document.getElementById("ortalama").style.color = "green";
        document.getElementById("ortalama").innerHTML = ortalama;
      }
      else if (ortalama === 0){
        document.getElementById("ortalama").style.color = "black";
        document.getElementById("ortalama").innerHTML = ortalama;
      }
      else{
        document.getElementById("ortalama").style.color = "red";
        document.getElementById("ortalama").innerHTML = ortalama;
      }      
      again_b.style.display = "block";
      tamam_div.style.display = "none";
      resim.style.display = "none";
      anlam.style.display = "none";
      dogruSayısı.style.display = "block";
      yanlısSayısı.style.display = "block";
      bosSayısı.style.display = "block";
      sonuc.style.display = "block";
      alan.style.display = "none";

      numbers = 0;
    }
    
    anlam.innerHTML = secilenanlamlar[numbers];
    resim.src = "images/"+letters[numbers]+".png";
    numbers++;
    disableButton();
    canCallFunction = false; // Fonksiyonu çağrılamaz hale getir
    setTimeout(function() {
      canCallFunction = true; // 2 saniye sonra fonksiyonu tekrar çağrılabilir hale getir
    }, 1000); // 2 saniye sonra çalışacak olan zamanlayıcı
}

}
  


function again(){
  const resim = document.getElementById("image");
  const again_b = document.getElementById("again")
  const tamam_div = document.getElementById("tamam-div")
  const anlam = document.getElementById("anlam-text")
  const dogruSayısı = document.getElementById("dogruSayısı")
  const yanlısSayısı = document.getElementById("yanlısSayısı")
  const bosSayısı = document.getElementById("bosSayısı")
  const sonuc = document.getElementById("sonuc")
  const alan = document.getElementById("alan")


  again_b.style.display = "none";
  tamam_div.style.display = "flex";
  resim.style.display = "flex";
  anlam.style.display = "block";
  dogruSayısı.style.display = "none";
  yanlısSayısı.style.display = "none";
  bosSayısı.style.display = "none";
  sonuc.style.display = "none";
  alan.style.display = "block";


  dogru = 0;
  yanlıs = 0;
  bos = 0;
  numbers = 0;
  change_img();
  dogruSayısı.innerHTML = "🟩 Doğru: ";
  yanlısSayısı.innerHTML = "🟥 Yanlış: ";
  bosSayısı.innerHTML = "🟨 Boş: ";
}


function disableButton() {
  // Butonu devre dışı bırak
  document.getElementById("geçbutton").disabled = true;

  // 2 saniye sonra butonu etkinleştir
  setTimeout(function() {
    document.getElementById("geçbutton").disabled = false;
  }, 1000);
}


