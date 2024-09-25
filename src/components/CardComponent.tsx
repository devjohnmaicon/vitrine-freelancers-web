import { CalendarDays, CircleDollarSign, HandCoins, MapPin, Phone, UserRound } from "lucide-react";


export default function CardComponent() {
  return (
    <div className="card card-side bg-base-100 shadow-xl pl-3">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between items-center">
          <div >
            <h2 className="card-title">Mc Donalds</h2>
            <p>Publicado: 14, Setembro. 16:40</p>
          </div>

          <span className="bg-neutral text-white font-bold p-2 rounded">FREELANCER</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="col-span-2 font-bold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
            architecto repudiandae illo rem laudantium deleniti cupidita.
            Reprehenderit.
          </div>
          <div className="flex gap-1"><UserRound/>Moto Entregador </div>
          <div className="flex gap-1"><CalendarDays /> Hoje, 11:00 às 14:00</div>
          <div className="flex gap-1"><CircleDollarSign /> Diária: R$ 50,00 </div>
          <div className="flex gap-1"> <HandCoins />Taxas: 5 | 10 | 15</div>
          <div className="flex gap-1"><Phone /> 
          61 99999-9999</div>
          <div className="flex gap-1"><MapPin /> Valparaíso, Goiás</div>
        </div>
      </div>
    </div>
  );
}
