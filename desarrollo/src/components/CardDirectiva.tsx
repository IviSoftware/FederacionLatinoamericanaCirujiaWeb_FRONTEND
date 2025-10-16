interface CardDirectivaProps {
  image: string;
  position?: string;
  name?: string;
  enterprise?: string;
  country?: string;
}

export const CardDirectiva = ({
  image,
  position,
  name,
  enterprise,
  country,
}: CardDirectivaProps) => {
  // URL base del CMS para las imágenes
  const CMS_BASE_URL = import.meta.env.PUBLIC_CMS_STORAGE_BASE_URL;
  const imageUrl = image.startsWith('http') ? image : `${CMS_BASE_URL}${image}`;

  return (
    <div className="w-full max-w-[300px] p-8 bg-[#F5F5F5] mb-4">
      <img
        src={imageUrl}
        alt="Directivas de FELAC"
        className="w-full max-w-[200px] h-auto rounded-lg mx-auto mb-4"
      />
      <div>
        <p className="font-bold text-center text-xl">{position}</p>
        <p className="text-center text-md">{name}</p>
        <p className="text-center text-md">{enterprise}</p>
        <p className="text-center text-md">{country}</p>
      </div>
    </div>
  );
};
