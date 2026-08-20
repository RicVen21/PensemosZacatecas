export type EstadoModeracion = "pendiente" | "aprobada" | "rechazada";

export interface PropuestaRow {
  id: string;
  categoria_slug: string;
  categoria_nombre: string;
  situacion: string;
  causa: string;
  propuesta: string;
  nombre: string | null;
  municipio: string | null;
  contacto: string | null;
  fecha_envio: string;
  estado_moderacion: EstadoModeracion;
}
