import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FileUp } from "lucide-react";
import { buttonVariants } from "./button.js";
import { cn } from "../../lib/utils.js";
// Caja para subir un archivo (de gesture): blanca (en oscuro, del color de las cajas), con una línea punteada
// gris adentro. En el medio, el ícono gris, el botón del color de la app para elegir el archivo y "o soltalo
// acá". Se toca toda la caja para elegir, o se suelta el archivo encima: al pasar el mouse se aclara un tono, y
// al arrastrar algo encima la línea punteada toma el color de la app. Con `loading`, muestra el texto de carga
// en lugar del botón. Al lado puede ir la vista previa del archivo (FilePreview), del mismo alto.
export function DropZone({ onFile, accept, label = "Elegir archivo", hint = "o soltalo acá", loading, loadingText = "Cargando...", icon, className, }) {
    const [over, setOver] = React.useState(false);
    return (_jsxs("label", { "data-slot": "drop-zone", "data-over": over || undefined, onDragOver: (e) => {
            e.preventDefault();
            setOver(true);
        }, onDragLeave: () => setOver(false), onDrop: (e) => {
            e.preventDefault();
            setOver(false);
            const file = e.dataTransfer.files[0];
            if (file)
                onFile(file);
        }, className: cn("group flex min-h-80 cursor-pointer rounded-box-l bg-card p-box-s transition-colors hover:bg-card-hover data-over:bg-card-hover has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand", className), children: [_jsxs("div", { className: "flex flex-1 flex-col items-center justify-center gap-box-m rounded-box-s border border-dashed border-input p-box-2xl text-center transition-colors group-data-over:border-brand", children: [icon ?? _jsx(FileUp, { "aria-hidden": true, strokeWidth: 1.5, className: "size-12 text-muted-foreground" }), loading ? (_jsx("span", { className: "text-sm text-muted-foreground", children: loadingText })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: cn(buttonVariants(), "pointer-events-none"), children: label }), _jsx("span", { className: "text-sm text-muted-foreground", children: hint })] }))] }), _jsx("input", { type: "file", accept: accept, className: "sr-only", onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file)
                        onFile(file);
                    e.target.value = "";
                } })] }));
}
