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
    <div className={`${className ? className : ''} my-3`}>
      {/* Título principal con estilos de fuente específicos */}
      <h1
        className={`${font.className} mb-3 text-lg font-semibold antialiased md:text-2xl`}
      >
        {title}
      </h1>

      {/* Subtítulo opcional con estilos de fuente específicos */}
      {subtitle && <h3 className="text-sm md:text-xl">{subtitle}</h3>}
    </div>
  );
};
