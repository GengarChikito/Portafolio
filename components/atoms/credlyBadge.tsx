import { Card, Tooltip } from "antd";

/**
 * Aquí definí las 'props' que va a recibir este componente.
 * Básicamente, es toda la información que necesito para pintar
 * una insignia de Credly.
 */
type Props = {
    /** El nombre del certificado. Lo uso para el 'alt' de la imagen y el h4. */
    name: string;
    /** Quién emitió el certificado (ej. "Cisco"). */
    issuer: string;
    /** Cuándo lo obtuve (ej. "Mar 2024"). */
    issued: string;
    /** El link a la imagen (normalmente de Credly). */
    imageUrl: string;
    /** El link de verificación. Toda la tarjeta va a apuntar aquí. */
    credentialUrl: string;
};

/**
 * Este es mi componente 'átomo' para mostrar una insignia de certificación.
 * La idea es que sea una tarjeta simple, clickeable, que te lleve a la
 * verificación oficial en Credly.
 */
export default function CredlyBadge({ name, issuer, issued, imageUrl, credentialUrl }: Props) {
    return (
        // Envolví todo en un '<a>' (enlace) para que la tarjeta completa sea clickeable.
        // Le quito la decoración de texto para que se vea limpio.
        <a href={credentialUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>

            {/* Usé una Card de Ant Design. 'hoverable' le da ese efecto de sombra
                cuando paso el mouse, lo que le dice al usuario que puede hacer clic.
            */}
            <Card hoverable style={{ borderRadius: 16, textAlign: "center" }}>

                {/* La imagen de la insignia */}
                <img
                    src={imageUrl}
                    alt={name} // Importante para accesibilidad
                    style={{ width: 84, height: 84, objectFit: "contain", margin: "8px auto" }}
                />

                {/* Uso un Tooltip de Ant Design por si el nombre del certificado es muy largo.
                  De esta forma, el usuario puede verlo completo si deja el mouse encima.
                */}
                <Tooltip title={name}>
                    <h4 style={{ margin: "8px 0 4px", fontSize: 14, lineHeight: 1.2 }}>{name}</h4>
                </Tooltip>

                {/* Finalmente, muestro el emisor y la fecha en letra pequeña. */}
                <small style={{ display: "block", color: "#888" }}>{issuer} · {issued}</small>
            </Card>
        </a>
    );
}