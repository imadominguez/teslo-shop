import { font } from '@/config/fonts';

// Definición de la interface de las Props del componente
interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    // Contenedor principal del título con posibilidad de aplicar una clase personalizada
    <div className={`${className} mt-3`}>
      {/* Título principal con estilos de fuente específicos */}
      <h1
        className={`${font.className} mb-3 mt-7 text-2xl font-semibold antialiased md:text-4xl`}
      >
        {title}
      </h1>

      {/* Subtítulo opcional con estilos de fuente específicos */}
      {subtitle && <h3 className="mb-5 text-lg md:text-xl">{subtitle}</h3>}
    </div>
  );
};
