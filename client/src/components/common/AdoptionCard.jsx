import React from "react";
import { AdoptionContext } from "../../context/AdoptionContext";

const AdoptionCard = ({ adoption }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        Pedido de adoção de {adoption.animalName}
      </h2>

      <div className="mb-2">
        <h3 className="text-md font-medium text-gray-700">
          <span className="font-semibold">Nome do abrigo:</span>
        </h3>
        <br />
        <p>{adoption.shelterName}</p>
        <br />
      </div>

      <div>
        <h3 className="text-md font-medium text-gray-700">
          <span className="font-semibold">Mensagem:</span>
        </h3>
        <br />
        <p>{adoption.message}</p>
      </div>
    </div>
  );
};

export default AdoptionCard;
