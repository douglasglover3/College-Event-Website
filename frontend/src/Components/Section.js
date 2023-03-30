
export function Section ({ children, color }) {

    return (
        <div className={color} style={{display: "flex", alignItems: "center", justifyContent:"space-around", paddingBlock:"60px", paddingInline:"100px",}}>
            {children}
        </div>
    );
}

export function SectionHeader ({ children, color }) {

    return (
        <div className={color + " lowershadow"} style={{ display: "flex", alignItems: "center", justifyContent:"space-around", paddingBlock:"10px", paddingInline:"100px"}}>
            {children}
        </div>
    );
}

export function SectionDivider ({ children, color, width }) {

    return (
        <div className={color} style={{ display: "flex", alignItems: "center", justifyContent:"space-around", paddingBlock: width + "px", paddingInline:"100px"}}>
            {children}
        </div>
    );
}