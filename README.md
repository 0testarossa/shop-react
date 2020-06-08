# shop-react

E - commerce 

Dokumentacja Sklepu z fantastycznymi książkami

Właściciel sklepu: Paulina Paszkowiak 132 303

Link do repozytorium, na którym znajduje się najnowsza wersja sklepu:


https://github.com/0testarossa/shop-react


1. Ogólne informacje:

Frameworki, biblioteki, paczki:

Sklep został napisany w meteorze, który łączy część backendową jak i frontendową. Są odpowiednio w strukturze wydzielone foldery dla serwera oraz klienta. Na początku stworzyłam standardowy projekt z użyciem iron routera pozwalającego na łatwe zarządzanie restem (postawienie końcówek restowych), jednak postawiłam sobie za zadanie stworzenie projektu na bazie hash routera z history oraz możliwością przechowywania state w lokalizacji za pomocą reacta po stronie frontendowej. 

Z zainstalowanych paczek wykorzystałam kilka dla komponentów, jak np select lista wykorzystywana przy sandboxie czy komponent currency. Do wykonywania żądań posłużyłam się axiosem, a do wystylizowania wszystkich stron sklepu zastosowałam bootstrapa w wersji 4. 

 Baza danych:

W projekcie można odnaleźć dwie kolekcje modelujące odpowiednio użytkowników oraz produkty dostępne w sklepie (kolejno kolekcje users oraz books). Są one przechowywane odpowiednio w bazie mongodb. Użytkownicy są dodawani poprzez rejestrację na stronie (o czym później), natomiast w celu dodania produktów posłużyłam się napisanym oddzielnie skryptem w pythonie w celu pobrania rzeczywistych tytułów książek czy autorów z poniższej strony internetowej:

https://www.goodreads.com/list/show/276.Best_Book_Titles

Struktura projektu:

Sklep składa się ze strony głównej, gdzie można przeglądać produkty, strony na której możemy doczytać szczegóły dotyczące produktu oraz kupić go w odpowiedniej ilości i z wyborem interesującej nas metody wysyłki. Ponadto można przejść na stronę z koszykiem, gdzie znajdują się wybrane przez nas produkty, strona z przykładowymi danymi do płatności, strony z formularzem do wykonania płatności na testowym api, strony informującej nas o statusie płatności (płatność przeszła pomyślnie lub nie), strony informującej nas, że jesteśmy na nieodpowiedniej stronie, a także stronie z logowaniem czy rejestracją.

Płatność:
W ramach przeprowadzenia testowej płatności została dodana integracja z testowym api udostępnionym przez dotPay. W celu jej dokonania zostało uprzednio dodane konto, by otrzymać dane do autoryzacji oraz ID sklepu, na które wysyłana jest testowa płatność. 

2. Szczegóły:

Baza danych:
Kolekcja książek składa się ze stu różnych produktów, wygenerowanych na podstawie prawdziwych tytułów i autorów książek.

Struktura kolekcji książek przedstawia się następująco:
{
      title:string,
      author:string,
      genre: string,
      price: string,
      header: string,
      availability: string,
      image: string,
      _id: string,
      deliveryTime: string,
      state: string,
      delivery: {
        pickUpInStore: {
          price: string,
          time: string
        },
        parcelLocker: {
          price: string,
          time: string
        },
        courier: {
          price: string,
          time: string
        }
      }
  },

gdzie header, availability oraz state to odpowiednio enumy:


dla przykładu header może przyjąć następujące wartości:
headers = ["RECOMMENDED", "NEW", "GOOD PRICE"]

przykład takiego produktu wygląda następująco:


{
      title:"Tower of God",
      author:"SIU",
      genre: "Fantasy",
      price: "50$",
      header: "RECOMMENDED",
      availability: "Available",
      image: "book42.png",
      _id: "gijrie-gjijrgi-45345jn",
      deliveryTime: "7-14 days",
      state: "new",
      delivery: {
        pickUpInStore: {
          price: "0$",
          time: ""
        },
        parcelLocker: {
          price: "2$",
          time: "14 days"
        },
        courier: {
          price: "5$",
          time: "7 days"
        }
      }
  },

title - tytuł książki
author - autor książki
genre - gatunek książki
price - cena książki
header - dodatkowy atrybut książki, tzn. czym się wyróżnia (dobra cena, jest rekomendowana, itd.)
availability - dostępność książki
image - obrazek głównego motywu książki
_id - unikalne id książki
deliveryTime - średni czas minimalny i maksymalny transportu
pickUpInStore - jedna z trzech możliwych metod wysyłki danego towaru, możliwe odebranie w sklepie
pickUpInStore.price - cena za wysyłkę przy odebraniu w sklepie
pickUpInStore.time - czas potrzebny na dostarczenie książki przy odebraniu w sklepie
parcelLocker - jedna z trzech możliwych metod wysyłki danego towaru, odebranie w paczkomacie
parcelLocker.price - cena za wysyłkę przy odebraniu w paczkomacie
parcelLocker.time - czas potrzebny na dostarczenie książki przy odebraniu w paczkomacie
courier - jedna z trzech możliwych metod wysyłki danego towaru, możliwe dostarczenie kurierem
courier.price - cena za wysyłkę przy wyborze metody jaką jest kurier
courier.time - czas potrzebny na dostarczenie książki przy odebraniu od kuriera


Struktura kolekcji użytkowników przedstawia się następująco:

{
      login: string,
      password: string
}

przykład takiego użytkownika wygląda następująco:


{
      login: admin,
      password: admin
}

login - unikalny login użytkownika w bazie
password - hasło użytkownika w bazie

Choć produkty i wszelkie informacje takie jak np. kwoty do zapłacenia za wybrane produkty są wyliczane na podstawie danych z bazy, o tyle same informacje dotyczące przechowywanych produktów, ich ilości oraz wyboru przesyłki dla każdego z produktu znajdują się w koszyku przechowywanym w local storage. Jest to o tyle wygodne, że dopóki sami się nie wylogujemy, o tyle przy zamykaniu i otwieraniu przeglądarki nadal mamy włożone przez nas produkty. Można by było dodać do tego rozwiązania również redux co dosyć ciekawie działa (co również udało się zrobić) ale ze względu na i tak dużą ilośc kodu i skomplikowanie go przy dodatkowy użyciu stora w reactcie pozostałam przy samym local storage. 

Struktura koszyka przedstawia się następująco:
{
        _id: string,
        delivery: string,
        amount: string
},

przykład takiego koszyka wygląda następująco:

{
        _id: "tirj-tj4i-nnjf54",
        delivery: "courier",
        amount: "2"
},

_id - id produktu w koszyku
delivery - wybrana metoda wysyłki danego produktu
amount - ilość danego produktu w koszyku











Struktura projektu:



Meteor dzieli się na część frontendową (client) oraz backendową (server) gdzie można dodać w pliku main.js dla przykładu końcówki restowe. Meteor załaduje wszystkie pliki poza katalog o nazwie import / w aplikacji, stąd w folderze import możemy znaleźć zarówno wcześniej wspomniane kolekcje books oraz users w api, a także osobno wydzielone pliki w ui. Mieszczą się w nich kolejno różne strony, funkcje i struktury, które będą dalej omawiane bardziej szczegółowo. Następnie mamy node_modules (instalowanie dependencies z package.json) oraz folder tests dla porządku. W folderze public mieszczą się zasoby, jak na przykład obrazki produktów które zostały odpowiednio wykorzystane przy widoku produktów.













W pliku main.css znajdują się wszystkie style, które zostały zaaplikowane w aplikacji poza tym, co możemy odnaleźć w bootstrapie. W pliku main.html możemy wyszukać nasz główny plik html z headem linkującym boostrapa oraz body, które jest następnie renderowane w dalszej części za pomocą id react-target. main.jsx jest plikiem w którym możemy odnaleźć wcześniej wspomniany hash router. W zależności od url przekierowuje on na odpowiedni komponent, który ma w danym momencie zostać wyrenderowany. 
Następnie warte uwagi są pliki znajdujące się przede wszystkim w folderze ui.
App jest główną stroną, na której możemy przeglądać listę produktów i wybrać ten, który nas bardziej interesuje.Możemy nawigować po kolejnych stronach produktów klikając odpowiednio indeks strony, który nas interesuje.


Następnie szczegóły danego produktu są renderowane w ProductPage. Możemy tam znaleźć dokładniejsze informacje na temat produktu jak np. gatunek, stan czy czas przesyłki i jego opis, jak również istnieje możliwość wybrania ilości sztuk danego produktu i metody wysyłki. Ponadto na dole odnajdziemy inne produkty, które są rekomendowane.








Następnie w pliku Cart mamy widok koszyka z dodanymi przez nas produktami. Możemy usunąć te przedmioty, które nas nie interesują (poprzez kliknięcie X), kupić jakiś konkretny (Buy Now), lub kupić wszystkie od razu. (Buy All)











W pliku PaymentForm mamy dostępny formularz z danymi do zrobienia płatności. Dane te są nastepnie przesyłane odpowiednio do api dotPay, a odpowiedź jest przekierowywana do widoku, znajdującego się w AfterPayment. Transakcja mogła przejść pomyślnie, lub mogła zostać anulowana. Dane które są wymagane to imię, nazwisko, email, kwota (wpisana), waluta, opis płatności oraz metoda płatności (np. blik). W przypadku niewypełnienia wszystkich danych lub wpisania niepoprawnego adresu email zostaniemy o tym odpowiednio poinformowani.











W pliku PaymentPage możemy odnaleźć widok przykładowych danych, które mogłyby być wyświetlane zamiast strony z formularzem z danymi do przelewu w dotPay.



W przypadku gdy próbujemy się dostać na stronę płatności wpisując ścieżkę do url z płatnością, otrzymujemy stronę, która informuje nas o nieprawidłowym przekierowaniu.


W pliku Register znajduje się widok odpowiedzialny za rejestrację użytkownika. Login użytkownika musi być unikalny aby został dodany do bazy.


W pliku Login znajduje się widok odpowiedzialny za logowanie użytkownika. Login i hasło muszą się zgadzać z tymi w bazie danych.


Ponadto możemy odnaleźć pliki takie jak mockBooks, mockCart które pokazują przykładowe dane, jakie mogłyby się w bazie/lokalnym storage. 

W pliku Storage znajduje się funkcja wykorzystywana przy korzystaniu z local storage. Jest on wykorzystywany do przechowywania koszyka po stronie klienta. 

Ponadto na stronach jest możliwość przejścia do głównej strony za pomocą linku Home



A także widzimy naszą nazwę użytkownika z możliwością wylogowania jeśli jesteśmy zalogowani, lub możliwość zalogowania, jeśli nie jesteśmy jeszcze zalogowani.





Ponadto na stronach znajdują się linki które umożliwiają dodatkowo przejście na niektóre strony. Na przykład będąc w widoku rejestracji możemy przejść na widok logowania (co również by nastąpiło tuż po sukcesywnym zarejestrowaniu nowego użytkownika). W widoku logowania możemy przejść do widoku rejestracji, jeśli nie mamy jeszcze utworzonego konta. Podobnie w przypadku dodawania produktów do koszyka możemy przejść do listy produktów lub do widoku naszego koszyka. 

Płatność:
Płatność została wykonana poprzez wykorzystanie DotPay za pomocą dokumentacji jaka jest udostępniona publicznie. Wszelka płatność idzie na api testowe:
https://ssl.dotpay.pl/test_payment/payment_api/v1/register_order/

Aby ją wykonać należy nie tylko wypełnić odpowiednio formularz o czym była mowa wyżej, ale również należy wysłać login i hasło (autoryzacja za pomocą pola auth w axiosie), odpowiednie nagłówki (accept oraz content type typu json), oraz jedną z dwóch dozwolonych metod. W moim przypadku wysyłam request za pomocą metody post. 
Wszystkie informacje z formularza są przekazywane do “data”, która jest następnie wysyłana zgodnie ze specyfikacją, jaką można znaleźć w poniższym linku:

https://www.dotpay.pl/developer/doc/credit-cards/pl/

Kanały (dozwolone metody płatności/channels) jakie wykorzystałam zostały przedstawione w linku poniżej:


https://www.dotpay.pl/developer/doc/api_payment/pl/index.html#document-06_zalaczniki_kanaly


Również z powyższej strony zostały zaczerpnięte obrazki do widoku formularza płatności, w celu uniknięcia pobierania ich lokalnie.



3. Odpalenie projektu:

W celu odpalenia projektu należy najpierw zainstalować meteor. Aby to uczynić, należy przejść na stronę główną:

https://www.meteor.com/install

Po lewej stronie mieści się instrukcja dla OSX/Linuxa a po prawej dla systemu Windows. Po zainstalowaniu potrzebnych zasobów należy odpalić w głównym katalogu  komendę 

meteor

Po wystartowaniu projektu przechodzimy na przeglądarkę i wpisujemy 

http://localhost:3000/#/

Co przeniesie nas do głównej strony z listą produktów. Z powodu problemów z cors policy (jest to spowodowane brakiem nagłówka Access-Control-Allow-Origin w odpowiedzi z DotPay) należy wyłączyć na ten czas cors policy. Dla przykładu dla przeglądarki chrome można to uczynić wpisując w wiersz poleceń (nie do powershella!) komendę:



"C:\ProgramFiles(x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp


lub przekopiowanie jej z poniższego linku:

https://alfilatov.com/posts/run-chrome-without-cors/



4. Prezentacja:

Filmik jest nagrywany za pomocą programu 

Free Cam 8

co daje znośną jakość, jednakże ruch myszki i jakiekolwiek pozostałe zmiany nie są zsynchronizowane. Oznacza to że ruch myszki jest około “1 sekundę przed resztą zmian ” i nie jest to problem z projektem. Nie przeszkadza to też w zaprezentowaniu całości rzecz jasna. Filmik znajduje się aktualnie na yt pod linkiem:


https://www.youtube.com/watch?v=_aqlfx3goqc

W razie jakichkolwiek problemów będę wdzięczna za kontakt.



