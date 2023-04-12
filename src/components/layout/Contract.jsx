import React, {Component} from 'react'
import Spinner from './Spinner'
import axios from 'axios'


export class Contract extends Component {
  state = { 
    isLoaded:false,
    order:{}
   } 

  async componentDidMount(){

    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/api/umowa/${window.location.pathname.split("/").pop()}`)
    try {
      this.setState({
       order:JSON.parse(res.data.order)[0],
        isLoaded: true})
    } catch (error) {
      this.setState({error})
    }

  };

  render() { 
    const{number, date, product, client, rabat, rentTime, fee_netto, fee_brutto} = this.state.order

    if(!this.state.isLoaded){
      return(
        <Spinner/>
      )
    } else {
      return (
      
        <div className="p-4 " id="rental-contract">
          <div className='d-flex justify-content-between'>
            <p>WROBUD Wróbel Spółka Jawna <br/> 37-100 Łańcut, ul. Mościckiego 4</p>
            <p>NIP 8151800777 Tel. 17 225 02 90 <br/> <a href="https://wrobud.com.pl">www.wrobud.com.pl</a></p>
          </div>
          <h2 className='text-center' >Umowa Najmu nr {number} </h2>
          <p className="contract-data text-justify text-center">Zawarta w dniu {new Date(date).toLocaleDateString()} w miejscowości {product.localization == 1? "Łańcut":product.localization == 2? "Żabno":product.localization == 3? "Adamówka":''} pomiędzy firmą: <br/> WROBUD Wróbel Spółka Jawna zwana dalej Wynajmującym, a: <br/>
          {client.name !==""? client.name: "............................."} {client.surname !==""? client.surname: "...................................."}, {client.street}  {client.house_number}, {client.post} {client.city}, nr PESEL: {client.pesel !==""? client.pesel: "......................................."}, zwanym dalej Najemcą.<br/> 
          </p>
          <div className="client-contact d-flex justify-content-around">
            <p>Nr tel.: {client.phone} </p>
            <p> Adres email: {client.email}</p> 
          </div>
          <ol>
            <li>Przedmiot Umowy:
              <ul className="rent-product">
                <li><strong>Nazwa urządzenia:</strong> {product.name} </li>
                <li><strong>Model:</strong> {product.index} </li>
                <li><strong>Cena - roboczodniówka:</strong> {product.cena_netto}zł netto / {product.cena_brutto}zł brutto</li>
                <li><strong>Rabat:</strong> {rabat === true? "10%": '0%'}</li>
                <li><strong>Odbiór:</strong> {rentTime[0]} od godz. 7:30</li>
                <li><strong>Zwrot:</strong> {rentTime[rentTime.length-1]} do godz. 18:00 </li>
                <li><strong>Ilość dni:</strong> {rentTime.length}</li>
                <li><strong>Kwota do zapłaty:</strong> {fee_netto}zł netto / {fee_brutto}zł brutto</li>
              </ul>
            </li>
            <li>Wynajmujący ma prawo do odebrania wynajmowanego sprzętu bez powiadomienia, gdy najmujący nie dotrzyma warunków umowy.</li>
            <li>Wynajmujący pobiera kaucję od najemcy w wysokości <strong>{product.deposit !== 0 ? product.deposit : "0"}zł</strong> na poczet należnego czynszu, ewentualnych szkód z niewłaściwego użytkowania przedmiotu najmu.</li>
            <li>Wynajmujący ma prawo do informacji o miejscu gdzie jest użytkowany i przechowywany wynajmowany przedmiot.</li>
            <li> Najemca zobowiązuje się płacić Wynajmującemu czynsz w wysokości wynikającej z przemnożenia ilości jednostek najmu i stawki za jedną jednostkę podaną w tabeli opłat.</li>
            <li> Najemca potwierdza, że wypożycza sprawny przedmiot i zobowiązuje się do korzystania z niego zgodnie z jego przeznaczeniem.</li>
            <li> Najemca zobowiązuje się do zabezpieczenia przedmiotu przed zniszczeniem i jego utratą, kradzieżą, a także odpowiada za powstałem szkody w przedmiocie najmu od chwili jego odbioru od wynajmującego do chwili zwrotu. <strong>Przedmioty wynajmowane nie są ubezpieczone od kradzieży i uszkodzeń u najemcy!</strong></li>
            <li> Najemca oznajmia, że nie będzie oddawać przedmiotu najmu w podnajem osobom trzecim.</li>
            <li> Najemca ma obowiązek oddać sprzęt sprawny, kompletny i czysty.</li>
            <li>Osoba najmująca ponosi koszty paliwa zasilającego sprzęt jak i koszty transportu.</li>
            <li>W razie zaginięcia, utraty lub zniszczenia Przedmiotu Najmu osoba najmująca jest obciążona kosztami i zobowiązana do zwrotu przedmiotu najmu niezależnie od zaistniałych okoliczności, według cen zakupu nowego sprzętu tego samego typu i marki.</li>
            <li>Wynajmujący ma prawo do naliczania odsetek w przypadku zalegania z zapłatą przez najemcę.</li>
            <li>W przypadku niewywiązania się z podpisanej umowy firma WROBUD Wróbel SPJ postępować będzie zgodnie z przepisami kodeksu cywilnego.</li>
            <li>Odpowiedzialność Wynajmującego za szkody wynikające bezpośrednio lub pośrednio z eksploatacji Przedmiotu Najmu jest wyłączona. Obsługa przedmiotu najmu może być powierzona przez Najemcę wyłącznie osobom posiadającym odpowiednie wymagane przez prawo uprawnienia, kwalifikacje i posiadającym znajomość zasad użytkowania Przedmiotu Najmu.
            </li>
            <li>Najemca wyraża zgodę na przetwarzanie jego danych osobowych, w tym przechowywanie dla celów realizacji umowy najmu, sprzedaży towarów i usług oraz rozliczeń finansowych. Najemca ma prawo wglądu, uzupełniania i poprawiania swoich danych osobowych. Przysługuje Pani/Panu prawo do wniesienia skargi do organu nadzorczego. Udostępnione dane nie będą podlegały udostępnianiu osobom trzecim. Odbiorcami danych będą tylko instytucje upoważnione z mocy prawa.
            </li>
            <li>Administratorem danych osobowych jest WROBUD Wróbel Spółka Jawna 37-100 Łańcut, ul. Mościckiego 4. Odbiorcami Pani/Pana danych osobowych będą osoby uczestniczące w realizacji oraz rozliczaniu umowy. Dane osobowe przechowywane będą przez okres 2 lat od zakończenia współpracy. Podanie danych jest dobrowolne, jednak odmowa podania danych może skutkować odmową zawarcia umowy z Wynajmującym.</li>
          </ol>
          <div className='d-flex justify-content-around my-4' >
            <p>................................<br/>Najemca (Klient)</p>
            <p>............................<br/>Wynajmujący</p>
          </div>
          
        </div>
      );
    }
  }
}
 
export default Contract;